// import jwt from "jsonwebtoken"
// import { response } from "../helpers/Response.js";
// import { userModel } from "../models/userModel.js";

// const MessageNoAutth = (res) => {
//     return response(res, 401, false, "", "no estas autorizado")
// }

// export const verifyToken = async (req, res, next) => {
//     let token = null;

//     if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
//         token = req.headers.authorization.split(" ")[1]
//         jwt.verify(token, "abc123", async (err, payload) => {
//             if (err) {
//                 return MessageNoAutth(res)
//             }
//             const user = await userModel.findById({ _id: payload.user })
//             if (!user) {
//                 MessageNoAutth(res)
//             }
//             req.userId = payload.user;
//             next()
//         })
//     }
//     if (!token) {
//         MessageNoAutth(res)
//     }
// }