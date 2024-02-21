import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import { Moradores } from "../interfaces/moradores.interface";
import { MoradoresDTO } from "src/dto/moradores.dto";
import { Residencias } from "../interfaces/residencias.interface";
import { updateResidenciaDTO } from "src/dto/residencias.dto";

@Injectable()
export class MoradoresRepository {

    constructor(
        @InjectModel('moradores') private readonly moradoresModel: Model<Moradores>
    ) { }

    async getMoradores(): Promise<Moradores[]> {
        return await this.moradoresModel.find()
            .populate({
                path: 'residencia encomendas',
                select: '-_id',
                populate: {
                    path: 'moradores',
                    select: '-_id -residencia -encomendas'
                }
            })
    }

    async getMoradorByFilter(moradorData: MoradoresDTO, residenciaID: string): Promise<Moradores> {
        return await this.moradoresModel.findOne({ name: moradorData.name, residencia: residenciaID })
            .populate({
                path: 'residencia encomendas',
                select: '-_id',
                populate: {
                    path: 'moradores',
                    select: '-_id -residencia -encomendas'
                }
            })
    }

    async getMoradorById(moradorID: string): Promise<Moradores> {
        return await this.moradoresModel.findById({ _id: moradorID }).select('-permission')
            .populate({
                path: 'residencia encomendas',
                select: '-_id',
                populate: {
                    path: 'moradores',
                    select: '-_id -residencia -encomendas'
                }
            });
    }

    async getMoradorByBlocoAp(filtroBlocoAp: updateResidenciaDTO): Promise<Moradores> {
        const { bloco, apartamento } = filtroBlocoAp;
        let moradores: any;
        let morador: any;
        if (bloco && apartamento) {
            moradores = await this.moradoresModel.find().select('-permission -encomendas -_id')
            .populate({ path: 'residencia', select: '-_id -moradores'})
            morador = moradores.filter((morador: any) => morador.residencia.bloco == bloco && morador.residencia.apartamento == apartamento )
        } else if (bloco && !apartamento) {
            moradores = await this.moradoresModel.find().select('-permission -encomendas -_id')
            .populate({ path: 'residencia', select: '-_id -moradores'})
            morador = moradores.filter((morador: any) => morador.residencia.bloco == bloco)
        } else if (!bloco && apartamento) {
            moradores = await this.moradoresModel.find().select('-permission -encomendas -_id')
            .populate({ path: 'residencia', select: '-_id -moradores'})
            morador = moradores.filter((morador: any) => morador.residencia.apartamento == apartamento )
        } 

        return morador || [];
    }

    async createMorador(newMorador: MoradoresDTO, residenciaMorador: Residencias): Promise<Moradores> {
        return (await this.moradoresModel.create({ name: newMorador.name, residencia: residenciaMorador }))
            .populate({
                path: 'residencia encomendas',
                select: '-_id',
                populate: {
                    path: 'moradores',
                    select: '-_id -residencia -encomendas'
                }
            });
    }

    async updateMorador(moradorID: string, moradorName: string): Promise<Moradores> {
        return await this.moradoresModel.findByIdAndUpdate({ _id: moradorID }, { name: moradorName }, { new: true })
            .populate({
                path: 'residencia encomendas',
                select: '-_id',
                populate: {
                    path: 'moradores',
                    select: '-_id -residencia -encomendas'
                }
            })
    }

    async updateResidenciaMorador(moradorID: string, residenciaID: string): Promise<Moradores> {
        return await this.moradoresModel.findOneAndUpdate({ _id: moradorID }, { residencia: residenciaID }, { new: true })
            .populate({
                path: 'residencia encomendas',
                select: '-_id',
                populate: {
                    path: 'moradores',
                    select: '-_id -residencia -encomendas'
                }
            })
    }

    async deleteMorador(moradorID: any): Promise<string> {
        return await this.moradoresModel.findOneAndDelete({ _id: moradorID });
    }
}