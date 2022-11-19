import { eliminarImagenCloudinary, subirImgageACloudinary } from "../helpers/cloudinaryActions.js";
import { deleteImg } from "../helpers/deleteImg.js";
import { response } from "../helpers/Response.js"
import { userModel } from "../models/userModels.js";

const empleadoCtrl = {}
// listar
empleadoCtrl.listar = async (req, res) => {
    try {
        const empleado = await userModel.find().populate("user").sort({createdAt:-1})
        response(res, 200, true, empleado, "lista de empleado");
    } catch (error) {
        response(res, 500, false, "", error.message);
    }
};
empleadoCtrl.listarEmpleadoLogin = async (req, res) => {
    try {
        const empleado = await userModel.find({user:req.userId}).populate("user",{password:0}).sort({createdAt:-1})
        response(res, 200, true, empleado, "lista de empleado del usuario logueado");
    } catch (error) {
        response(res, 500, false, "", error.message);
    }
};

// listar po id
empleadoCtrl.listOne = async (req, res) => {
    try {
        const { id } = req.params;
        const empleado = await userModel.findById(id)
        if (!empleado) {
            return response(res, 404, false, "", "registro no encontrado")
        }
        response(res, 200, true, empleado, "empleado encontrado")
    } catch (error) {
        response(res, 500, false, "", error.message);
    }
};
// crear empleado
empleadoCtrl.add = async (req, res) => {
    try {
        const { description } = req.body
        const newempleado = new userModel({
            description,
            user:req.userId
        });

        // req.file && newempleado.setImg(req.file.filename);

        if (req.file) {
            const { secure_url, public_id } = await subirImgageACloudinary(req.file);
            newempleado.setImg(secure_url, public_id);
        }


        await userModel.create(newempleado);
        response(res, 201, true, newempleado, "probado");
    } catch (error) {
        response(res, 500, false, "", error.message);
    };
};
// eliminar/img
empleadoCtrl.delete = async (req, res) => {
    try {
        const { id } = req.params;
        const empleado = await userModel.findById(id)
        if (!empleado) {
            return response(res, 404, false, "", "registro no encontrado")
        }

        //    empleado.nameImage && deleteImg(empleado.nameImage);

        if (empleado.public_id) {
            await eliminarImagenCloudinary(empleado.public_id)
        }


        await empleado.deleteOne()
        response(res, 200, true, "", "empleado eliminado");
    } catch (error) {
        response(res, 500, false, "", error.message);
    };
};
// actualizar
empleadoCtrl.update = async (req, res) => {
    try {
        const { id } = req.params;
        const empleado = await userModel.findById(id)
        if (!empleado) {
            return response(res, 404, false, "", "registro no encontrado")
        }
        if (req.file) {
            // empleado.nameImage && deleteImg(empleado.nameImage);
            // empleado.setImg(req.file.filename);
            if (empleado.public_id) {
                await eliminarImagenCloudinary(empleado.public_id)
            }
            const { secure_url, public_id } = await subirImgageACloudinary(req.file);
            empleado.setImg(secure_url, public_id);
            await empleado.save()
        }
        
        await empleado.updateOne(req.body);
        response(res, 200, true, "", "empleado actualizado");
    } catch (error) {
        response(res, 500, false, "", error.message);
    }
}

export default empleadoCtrl;