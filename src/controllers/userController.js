import { encryptPassword } from "../helpers/encryptPassword.js";
import { generateToken } from "../helpers/generateToken.js";
import { response } from "../helpers/Response.js";

import bcrypt from "bcrypt"
import { userModel } from "../models/userModels.js";
const userCtrl = {}

userCtrl.register = async (req, res) => {
    try {
        const { email, password, name, lastname } = req.body;
        const user = await userModel.findOne({ email })
        if (user) {
            return response(res, 409, false, "", "el email ya existe en otro registro")
        }

        const passwordEncrypt = encryptPassword(password);

        const newUser = new userModel({ email, password: passwordEncrypt, name, lastname });

        await newUser.save();

        const token = generateToken({ user: newUser._id });

        response(res, 201, true, { ...newUser._doc, password: null, token }, "Usuario creado")
    } catch (error) {
        response(res, 500, false, error.message)
    }
}
userCtrl.login = async (req, res) => {
    try {
        const { password, email } = req.body;
        const user = await userModel.findOne({ email })

        if (user && user.matchPassword(password)) {
            const token = generateToken({ user: user._id });
            return response(res,
                200,
                true,
                { ...user.toJSON(), password: null, token },
                "Bienvenido")
                
        }
        response(res, 400, false, "", "email o password incoorectos")

    } catch (error) {
        response(res, 500, false, "", error.message)
    }
}

export default userCtrl 