import { Injectable } from '@nestjs/common';
import { ResidenciasDTO } from 'src/dto/residencias.dto';
import { Residencias } from 'src/mongo/interfaces/residencias.interface';
import { ResidenciasRepository } from 'src/mongo/repository/residencias.repository';

@Injectable()
export class ResidenciasService {

    constructor(
        private readonly residenciasRepository: ResidenciasRepository
    ){}

    async getResidenciaByFilter(residenciaData: ResidenciasDTO): Promise<ResidenciasDTO>{
        return await this.residenciasRepository.getResidenciaByFilter(residenciaData);
    }

    async createResidencia(newResidencia: ResidenciasDTO): Promise<Residencias>{
        return await this.residenciasRepository.createResidencia(newResidencia);
    }

}
