import { Schema, Document } from "mongoose";

export interface Funcionarios extends Document {

    readonly id: Schema.Types.ObjectId,
    readonly name: string,
    readonly email: string,
    readonly password: string,
    readonly permission: string

}