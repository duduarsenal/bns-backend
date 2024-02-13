import { Document } from "mongoose";
import * as mongoose from 'mongoose';

//Interface do item que vou receber/buscar no banco de dados
export interface Residencias extends Document {

    readonly id: mongoose.Schema.Types.ObjectId,
    readonly apartamento: number,
    readonly bloco: string
    readonly proprietario: string,
    readonly moradores?: mongoose.Schema.Types.ObjectId[]
}