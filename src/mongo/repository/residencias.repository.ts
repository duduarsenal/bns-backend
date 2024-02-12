import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import { Moradores } from "../interfaces/moradores.interface";
import { MoradoresDTO } from "src/dto/moradores.dto";
import { ResidenciasDTO } from "src/dto/residencias.dto";
import { Residencias } from "../interfaces/residencias.interface";

@Injectable()
export class ResidenciasRepository{

    constructor(
        @InjectModel('residencias') private readonly residenciasModel: Model<Residencias>
    ){}
    
    async getResidenciaByFilter(residenciaData: ResidenciasDTO): Promise<Residencias>{
        
        const { apartamento, bloco, proprietario } = residenciaData;
        
        return await this.residenciasModel.findOne({apartamento: apartamento, bloco: bloco, proprietario: proprietario});
    }
    
    async createResidencia(newResidencia: ResidenciasDTO): Promise<Residencias>{
        // const user = await this.residenciasModel.findOne({email: newMorador});
        // if (user) throw new BadRequestException('Usuario ja existe');
    
        return await this.residenciasModel.create(newResidencia);
    }
}