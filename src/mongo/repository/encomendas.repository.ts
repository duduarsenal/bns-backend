import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Encomendas } from "../interfaces/encomendas.interface";
import { Model } from "mongoose";
import { EncomendasDTO, updateEncomendaDTO } from "src/dto/encomendas.dto";


@Injectable()
export class EncomendasRepository{

    constructor(
        @InjectModel('encomendas') private readonly encomendasModel: Model<Encomendas>
    ){}

    async getAllEncomendas(): Promise<Encomendas[]>{
        return await this.encomendasModel.find()
            .populate({
                path: 'destinatario residencia'
            })
    }

    async getEncomendaById(encomendaID: string): Promise<Encomendas>{
        return await this.encomendasModel.findById({_id: encomendaID})
            .populate({
                path: 'destinatario residencia'
            })
    }

    async createEncomenda(newEncomenda: EncomendasDTO): Promise<Encomendas>{
        return (await this.encomendasModel.create(newEncomenda))
            .populate({
                path: 'destinatario residencia'
            })
    }

    async updateEncomenda(encomendaID: string, encomendaData: updateEncomendaDTO): Promise<Encomendas>{
        return await this.encomendasModel.findOneAndUpdate(
            {_id: encomendaID},
            {...encomendaData},
            {new: true}
            )
            .populate({
                path: 'destinatario residencia'
            })
    }

    async deleteEncomenda(encomendaID: string): Promise<void>{
        await this.encomendasModel.findOneAndDelete({_id: encomendaID});
    }
}