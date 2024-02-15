import { Schema, Document } from "mongoose";

export interface Residencias extends Document {

    readonly id: Schema.Types.ObjectId,
    readonly apartamento: number,
    readonly bloco: string
    readonly proprietario: string,
    readonly moradores?: Schema.Types.ObjectId[]
}