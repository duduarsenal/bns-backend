import { BadRequestException, Injectable } from '@nestjs/common';
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

    async getMoradorById(moradorID: string): Promise<Moradores>{
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
            if(!residenciaMorador) throw new BadRequestException('Residência não existe')
            
            const createdMorador = await this.moradoresRepository.createMorador(newMorador, residenciaMorador._id)

            if (!createdMorador) throw new BadRequestException('Erro ao criar um funcionario')

            return createdMorador;
        } catch (error) {
            throw new BadRequestException(error.message || 'Erro ao criar um funcionario')
        }
    }
}
