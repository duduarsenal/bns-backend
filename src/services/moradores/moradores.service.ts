import { BadRequestException, Injectable } from '@nestjs/common';
import mongoose, { mongo } from 'mongoose';
import { MoradoresDTO } from 'src/dto/moradores.dto';
import { Moradores } from 'src/mongo/interfaces/moradores.interface';
import { MoradoresRepository } from 'src/mongo/repository/moradores.repository';
import { ResidenciasRepository } from 'src/mongo/repository/residencias.repository';

@Injectable()
export class MoradoresService {

    constructor(
        private readonly moradoresRepository: MoradoresRepository,
        private readonly residenciaRepository: ResidenciasRepository,
    ){}

    async getMoradores(): Promise<Moradores[]>{
        try{
            const allMoradores = await this.moradoresRepository.getMoradores();
            return allMoradores || [];
        } catch (error) {
            console.error(error)
            throw new BadRequestException(error.message || 'Erro ao buscar todos os moradores');
        }
    }

    async getMoradorById(moradorID: string): Promise<Moradores>{
        try {
            const morador = await this.moradoresRepository.getMoradorById(moradorID);
            if (!morador) throw new BadRequestException('Morador não encontrado');
    
            return morador;
        } catch (error) {
            console.log(error.message)
            throw new BadRequestException(error.message || 'Erro na busca pelo morador')
        }
    }

    async createMorador(newMorador: MoradoresDTO): Promise<Moradores>{
        try {
            const { apartamento, bloco, proprietario } = newMorador.residencia;

            const residenciaMorador = await this.residenciaRepository.getResidenciaByFilter({apartamento, bloco, proprietario})
            if(!residenciaMorador) throw new BadRequestException('Residência não encontrada')
            
            const createdMorador = await this.moradoresRepository.getMoradorByFilter(newMorador, residenciaMorador._id)
            if (createdMorador) throw new BadRequestException('Morador ja cadastrado no sistema')

            const morador = await this.moradoresRepository.createMorador(newMorador, residenciaMorador._id);
            if(!morador) throw new BadRequestException('Erro ao criar novo morador')

            await this.residenciaRepository.addMoradorToResidencia(newMorador.residencia, morador._id);

            return morador;
        } catch (error) {
            console.log(error)
            throw new BadRequestException(error.message || 'Erro ao criar novo morador')
        }
    }

    async updateMorador(moradorID: string, moradorData: MoradoresDTO): Promise<Moradores>{
        try {
            const existMorador = await this.moradoresRepository.getMoradorById(moradorID);
            if (!existMorador) throw new BadRequestException('Morador não encontrado');

            const residenciaAtualMorador = await this.residenciaRepository.getResidenciaById(existMorador.residencia.toString());

            if (moradorData.residencia){
                var residenciaMorador = await this.residenciaRepository.getResidenciaByFilter(moradorData.residencia)
                if(!residenciaMorador) throw new BadRequestException('Residência não cadastrada no sistema');
            }

            if(moradorData.residencia && existMorador.residencia.toString() != residenciaMorador._id){

                const { apartamento, bloco, proprietario } = residenciaMorador;

                await this.moradoresRepository.updateResidenciaMorador(moradorID, residenciaMorador._id);
                await this.residenciaRepository.deleteMoradorFromResidencia(
                    { 
                        apartamento: residenciaAtualMorador.apartamento, 
                        bloco: residenciaAtualMorador.bloco, 
                        proprietario: residenciaAtualMorador.proprietario
                    }, moradorID);
                await this.residenciaRepository.addMoradorToResidencia({ apartamento, bloco, proprietario }, moradorID);
            }

            return await this.moradoresRepository.updateMorador(moradorID, moradorData.name);
        } catch (error) {
            console.log(error)
            throw new BadRequestException(error.message || 'Erro ao atualizar o morador')
        }
    }

    async deleteMorador(moradorID: string): Promise<string>{
        try {
            const existMorador = await this.moradoresRepository.getMoradorById(moradorID);
            if (!existMorador) throw new BadRequestException('Morador não encontrado')

            const residenciaMorador = await this.residenciaRepository.getResidenciaById(existMorador.residencia.toString());
            if (!residenciaMorador) throw new BadRequestException('Residência não encontrada');
            
            const { apartamento, bloco, proprietario } = residenciaMorador;
            await this.residenciaRepository.deleteMoradorFromResidencia({ apartamento, bloco, proprietario }, moradorID)

            return await this.moradoresRepository.deleteMorador(moradorID);
        } catch (error) {
            console.log(error)
            throw new BadRequestException(error.message || 'Erro ao deletar morado do sistema')
        }
    }
}
