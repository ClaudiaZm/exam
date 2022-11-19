import { verifyToken } from '../middleware/auth.js';
import { upload } from '../middleware/imgUpload.js';
import empleadoCtrl from '../controllers/postController.js';
import { Router } from 'express';

const route = Router();

route.get('/', empleadoCtrl.listar);
route.get('/user',empleadoCtrl.listarEmpleadoLogin);
route.get('/:id', verifyToken,empleadoCtrl.listOne);
route.post('/',upload.single("img"), empleadoCtrl.add);


export default route;