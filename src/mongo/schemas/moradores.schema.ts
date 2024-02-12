import { Schema } from "mongoose";

export const MoradoresSchema = new Schema({

    name: String,
    residencia: [{
        type: String,
        ref: 'residencias',
        require: false
    }],
    encomendas: [{
        type: String,
        ref: 'encomendas',
        require: false
    }],
    __v: {
        type: String,
        select: false
    }
})