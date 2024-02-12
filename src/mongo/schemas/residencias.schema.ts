import { Schema } from "mongoose";

export const ResidenciasSchema = new Schema({

    apartamento: Number,
    bloco: String,
    proprietario: String,
    moradores: [{
        type: String,
        ref: 'moradores',
        require: false
    }],
    __v: {
        type: String,
        select: false
    }
    
})