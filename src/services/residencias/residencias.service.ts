import { BadRequestException, Injectable } from '@nestjs/common';
import { ResidenciasDTO, parcialResidenciaDTO } from 'src/dto/residencias.dto';
import { Residencias } from 'src/mongo/interfaces/residencias.interface';
import { ResidenciasRepository } from 'src/mongo/repository/residencias.repository';

@Injectable()
export class ResidenciasService {

    constructor(
        private readonly residenciasRepository: ResidenciasRepository
    ){}

    async getAllResidencias(): Promise<Residencias[]>{
        try {
            const allResidencias = await this.residenciasRepository.getAllResidencias();
            return allResidencias || [];
        } catch (error) {
            console.log(error)
            throw new BadRequestException(error.message || 'Erro ao buscar todas as residências')
        }
    }

    async getBlocosApartamentos(): Promise<parcialResidenciaDTO[]>{
        try {
            const BlocosApartamentos = await this.residenciasRepository.getBlocosApartamentos();
            if (!BlocosApartamentos) throw new BadRequestException('Nenhum bloco ou apartamento cadastrado')

            return BlocosApartamentos;
        } catch (error) {
            throw new BadRequestException(error.message || 'Erro ao buscar blocos e apartamentos')
        }
    }

    async getResidenciaByFilter(residenciaData: parcialResidenciaDTO): Promise<Residencias>{

        try {
            const residencia = await this.residenciasRepository.getResidenciaByFilter(residenciaData);
            if (!residencia) throw new BadRequestException('Residência não encontrada');

            return residencia;
        } catch (error) {
            console.log(error)
            throw new BadRequestException(error.message || 'Erro ao buscar residência');
        }
    }

    async createResidencia(newResidencia: ResidenciasDTO): Promise<Residencias>{
        try {
            const existResidencia = await this.residenciasRepository.getResidenciaByFilter({...newResidencia});
            if (existResidencia) throw new BadRequestException('Residência já cadastrada');
            
            return await this.residenciasRepository.createResidencia(newResidencia);
        } catch (error) {
            console.log(error)
            throw new BadRequestException(error.message || 'Erro ao criar nova residência');
        }
    }

    async updateResidencia(residenciaID: string, residenciaData: parcialResidenciaDTO): Promise<Residencias>{
        try {
            const existResidencia = await this.residenciasRepository.getResidenciaById(residenciaID)
            if(!existResidencia) throw new BadRequestException('Residência não encontrada')

            return await this.residenciasRepository.updateResidencia(residenciaID, residenciaData);
        } catch (error) {
            console.log(error.message)
            throw new BadRequestException(error.message || 'Erro ao atualizar residência')
        }
    }

}
