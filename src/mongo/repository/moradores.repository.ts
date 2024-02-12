import { BadRequestException, Injectable } from "@nestjs/common";
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
    }

    async getMoradorById(moradoresID: string): Promise<Moradores>{
        return await this.moradoresModel.findById({_id: moradoresID}).select('-permission');
    }
    
    async createMorador(newMorador: MoradoresDTO, residenciaMorador: Residencias): Promise<Moradores>{
        const user = await this.moradoresModel.findOne({name: newMorador.name, residencia: residenciaMorador});
        if (user) throw new BadRequestException('Usuario ja existe');

        return await this.moradoresModel.create({name: newMorador.name, residencia: residenciaMorador});
    }
}