import { Schema } from "mongoose";

export const FuncionariosSchema = new Schema({

    name: String,
    email: String,
    password: {
        type: String,
        select: false
    },
    permission: String,
    __v: {
        type: Number,
        select: false
    }

})