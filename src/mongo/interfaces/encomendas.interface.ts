import { Schema, Document } from "mongoose";

export interface Encomendas extends Document {

    readonly id: Schema.Types.ObjectId,
    readonly destinatario: Schema.Types.ObjectId,
    readonly residencia: Schema.Types.ObjectId,
    readonly codrastreio: string,
    readonly status: boolean,
    readonly recebedor?: string,
    readonly dtchegada: Date,
    readonly dtretirada?: Date,

}