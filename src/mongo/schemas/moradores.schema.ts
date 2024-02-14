import { Schema } from "mongoose";

export const MoradoresSchema = new Schema({

    name: String,
    residencia: {
        type: Schema.Types.ObjectId,
        ref: 'residencias',
        require: true
    },
    encomendas: [{
        type: Schema.Types.ObjectId,
        ref: 'encomendas',
        require: false
    }],
    __v: {
        type: String,
        select: false
    }
})