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
        } catch (err) {
            console.error(err)
            throw new BadRequestException(err.message || 'Erro ao buscar todos os funcionarios');
        }
    }

    async getMoradorById(moradorID: String): Promise<Moradores>{
        try {
            const morador = await this.moradoresRepository.getMoradorById(moradorID);
            if (!morador) throw new BadRequestException('Usuario não encontrado');
    
            return morador;
        } catch (error) {
            throw new BadRequestException(error.message || 'Erro na busca pelo usuario')
        }
    }

    async createMorador(newMorador: MoradoresDTO): Promise<Moradores>{
        try {

            const { residencia } = newMorador;
            const { apartamento, bloco, proprietario } = residencia;

            const residenciaMorador = await this.residenciaRepository.getResidenciaByFilter({apartamento, bloco, proprietario})
            if(!residenciaMorador) throw new BadRequestException('Residência não existe no sistema')
            
            const createdMorador = await this.moradoresRepository.getMoradorByFilter(newMorador, residenciaMorador._id)
            if (createdMorador) throw new BadRequestException('Morador ja cadastrado no sistema')

            const morador = await this.moradoresRepository.createMorador(newMorador, residenciaMorador._id);
            if(!morador) throw new BadRequestException('Erro ao criar novo morador')

            await this.residenciaRepository.addMoradorToResidencia(residencia, morador._id);

            return morador;
        } catch (error) {
            console.log(error)
            throw new BadRequestException(error.message || 'Erro ao criar novo morador')
        }
    }

    async updateMorador(moradorID: mongoose.Schema.Types.ObjectId, moradorData: MoradoresDTO): Promise<Moradores>{

        try {
            const existMorador = await this.moradoresRepository.getMoradorById(moradorID.toString());
            if (!existMorador) throw new BadRequestException('Morador não existe no sistema');

            const residenciaAtualMorador = await this.residenciaRepository.getResidenciaById(existMorador.residencia.toString());

            if (moradorData.residencia){
                var residenciaMorador = await this.residenciaRepository.getResidenciaByFilter(moradorData.residencia)
                if(!residenciaMorador) throw new BadRequestException('Residência não cadastrada no sistema');
            }

            if(moradorData.residencia && existMorador.residencia.toString() != residenciaMorador._id.toString()){

                const { apartamento, bloco, proprietario } = residenciaMorador;

                await this.moradoresRepository.updateResidenciaMorador(moradorID.toString(), residenciaMorador._id);
                await this.residenciaRepository.deleteMoradorFromResidencia(
                    { 
                        apartamento: residenciaAtualMorador.apartamento, 
                        bloco: residenciaAtualMorador.bloco, 
                        proprietario: residenciaAtualMorador.proprietario
                    }, moradorID.toString());
                await this.residenciaRepository.addMoradorToResidencia({ apartamento, bloco, proprietario }, moradorID);
            }

            return await this.moradoresRepository.updateMorador(moradorID.toString(), moradorData.name);
        } catch (error) {
            console.log(error)
            throw new BadRequestException(error.message || 'Erro ao atualizar o morador')
        }
    }

    async deleteMorador(moradorID: String): Promise<String>{
        try {
            const existMorador = await this.moradoresRepository.getMoradorById(moradorID);
            if (!existMorador) throw new BadRequestException('Morador não existe no sistema')

            const residenciaMorador = await this.residenciaRepository.getResidenciaById(existMorador.residencia.toString());
            if (!residenciaMorador) throw new BadRequestException('Erro ao localizar residência do morador');
            
            const { apartamento, bloco, proprietario } = residenciaMorador;
            await this.residenciaRepository.deleteMoradorFromResidencia({ apartamento, bloco, proprietario }, moradorID.toString())

            return await this.moradoresRepository.deleteMorador(moradorID);
        } catch (error) {
            console.log(error)
            throw new BadRequestException(error.message || 'Erro ao deletar morado do sistema')
        }
    }
}
