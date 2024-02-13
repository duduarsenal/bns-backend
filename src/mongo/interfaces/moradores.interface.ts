import * as mongoose from 'mongoose';
import { EncomendasDTO } from "src/dto/encomendas.dto";

export interface Moradores extends mongoose.Document {

    readonly id: mongoose.Schema.Types.ObjectId;
    readonly name: string;
    readonly residencia: mongoose.Schema.Types.ObjectId;
    readonly encomendas?: EncomendasDTO[];
}