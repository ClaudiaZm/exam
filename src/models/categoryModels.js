import mongoose from "mongoose"
import bcrypt from "bcrypt"
const { Schema, model } = mongoose;

const userSchema = new Schema({

    name: {
        type: String,
        required: [true, "el campo name es requerido "]
    },

    description: {
        type: String,
        required: [true, "el campo description es requerido "],
        unique: true
    },

    imgUrl: {
        type: String,
        default: null,
    },
    public_id:String,
    user:{
        type:Schema.Types.ObjectId,
        ref:"user"
    }

}, {
    timestamps: true,
}
);

export const userModel = model("user", userSchema)