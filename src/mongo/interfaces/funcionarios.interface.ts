import { Schema, Document } from "mongoose";

//Interface do item que vou receber/buscar no banco de dados
export interface Funcionarios extends Document {

    readonly id: Schema.Types.ObjectId,
    readonly name: string,
    readonly email: string,
    readonly password: string,
    readonly permission: string

}