import { Schema, Document } from 'mongoose';

export interface Moradores extends Document {

    readonly id: Schema.Types.ObjectId;
    readonly name: string;
    readonly residencia: Schema.Types.ObjectId;
    readonly encomendas?: Schema.Types.ObjectId[];
}