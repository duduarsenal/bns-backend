import { Document } from "mongoose";
import * as mongoose from 'mongoose';
import { ResidenciasDTO } from "src/dto/residencias.dto";
import { EncomendasDTO } from "src/dto/encomendas.dto";

//Interface do item que vou receber/buscar no banco de dados
export interface Moradores extends Document {

    readonly id: mongoose.Schema.Types.ObjectId,
    readonly name: string,
    readonly residencia: string[],
    readonly encomendas?: EncomendasDTO[],
}