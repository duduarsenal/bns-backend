import mongoose, { Schema } from "mongoose";

export const ResidenciasSchema = new Schema({

    apartamento: Number,
    bloco: String,
    proprietario: String,
    moradores: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'moradores',
        require: false
    }],
    __v: {
        type: String,
        select: false
    }
    
})