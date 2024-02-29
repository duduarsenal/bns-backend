import { Schema } from "mongoose";

export const EncomendasSchema = new Schema({

    destinatario: {
        type: Schema.Types.ObjectId,
        ref: 'moradores',
        require: true
    },
    residencia: {
        type: Schema.Types.ObjectId,
        ref: 'residencias',
        require: true
    },
    codrastreio: String,
    status: Number,
    recebedor: {
        type: String,
        require: false
    },
    dtchegada: Date,
    dtretirada: {
        type: Date,
        require: false
    },
    __v: {
        type: String,
        select: false
    }
})