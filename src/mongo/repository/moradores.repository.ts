import { Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import { Moradores } from "../interfaces/moradores.interface";
import { MoradoresDTO } from "src/dto/moradores.dto";
import { Residencias } from "../interfaces/residencias.interface";

@Injectable()
export class MoradoresRepository{

    constructor(
        @InjectModel('moradores') private readonly moradoresModel: Model<Moradores>
    ){}

    async getMoradores(): Promise<Moradores[]>{
        return await this.moradoresModel.find()
        .populate({
            path: 'residencia',
            select: '-_id',
            // populate: {
            //     path: 'moradores',
            //     select: '-_id -residencia -encomendas'
            // }
        })
    }

    async getMoradorByFilter(moradorData: MoradoresDTO, residenciaID: string): Promise<Moradores>{
        return await this.moradoresModel.findOne({name: moradorData.name, residencia: residenciaID})
    }

    async getMoradorById(moradorID: String): Promise<Moradores>{
        return await this.moradoresModel.findById({_id: moradorID}).select('-permission');
    }
    
    async createMorador(newMorador: MoradoresDTO, residenciaMorador: Residencias): Promise<Moradores>{
        return await this.moradoresModel.create({name: newMorador.name, residencia: residenciaMorador});
    }
}