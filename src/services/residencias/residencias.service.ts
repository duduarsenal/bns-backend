import { BadRequestException, Injectable } from '@nestjs/common';
import { ResidenciasDTO } from 'src/dto/residencias.dto';
import { Residencias } from 'src/mongo/interfaces/residencias.interface';
import { ResidenciasRepository } from 'src/mongo/repository/residencias.repository';

@Injectable()
export class ResidenciasService {

    constructor(
        private readonly residenciasRepository: ResidenciasRepository
    ){}

    async getAllResidencias(): Promise<Residencias[]>{
        try {
            return await this.residenciasRepository.getAllResidencias();
        } catch (error) {
            console.log(error)
            throw new BadRequestException(error.message || 'Erro ao buscar todas as residências')
        }
    }

    async getResidenciaByFilter(residenciaData: ResidenciasDTO): Promise<Residencias>{

        try {
            const residencia = await this.residenciasRepository.getResidenciaByFilter(residenciaData);
            if (!residencia) throw new BadRequestException('Nenhuma residência encontrada');

            return residencia;
        } catch (error) {
            console.log(error)
            throw new BadRequestException(error.message || 'Erro ao buscar residência');
        }
    }

    async createResidencia(newResidencia: ResidenciasDTO): Promise<Residencias>{
        try {
            
            const existResidencia = await this.residenciasRepository.getResidenciaByFilter({
                apartamento: newResidencia.apartamento,
                bloco: newResidencia.bloco,
                proprietario: newResidencia.proprietario,
            });
            
            if (existResidencia) throw new BadRequestException('Residência já cadastrada');
            
            return await this.residenciasRepository.createResidencia(newResidencia);
        } catch (error) {
            console.log(error)
            throw new BadRequestException(error.message || 'Erro ao criar nova residência')
        }
    }

    async updateResidencia(residenciaID: String, residenciaData: Residencias): Promise<Residencias>{
        try {
            const existResidencia = await this.residenciasRepository.getResidenciaById(residenciaID)
            if(!existResidencia) throw new BadRequestException('Residência não está cadastrada no sistema')

            return await this.residenciasRepository.updateResidencia(residenciaID, residenciaData);
        } catch (error) {
            console.log(error.message)
            throw new BadRequestException(error.message || 'Erro ao atualizar residência')
        }
    }

}
