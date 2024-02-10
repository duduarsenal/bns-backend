import { Schema } from "mongoose";

export const EmployeeSchema = new Schema({

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