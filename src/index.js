import express from "express";
import cors from "cors";
import morgan from "morgan";
import {connectDb} from "./dataBase.js";

import userRoute from "./routes/userRoutes.js"
import categoryRoutes from "./routes/categoryRoutes.js"

connectDb()
const app = express();

app.set("port", 4000);
app.use / morgan(("dev"));
app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/user", userRoute);
// app.use("/category",categoryRoutes);

app.listen(app.get("port"), () => { console.log("servidor escuchando por el puerto", app.get("port")) });

