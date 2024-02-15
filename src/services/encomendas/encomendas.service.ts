import { BadRequestException, Injectable } from '@nestjs/common';
import { EncomendasDTO, updateEncomendaDTO } from 'src/dto/encomendas.dto';
import { Encomendas } from 'src/mongo/interfaces/encomendas.interface';
import { EncomendasRepository } from 'src/mongo/repository/encomendas.repository';

@Injectable()
export class EncomendasService {

    constructor(
        private readonly encomendasRepository: EncomendasRepository
    ){}

    async getAllEncomendas(): Promise<Encomendas[]>{
        try {
            const allEncomendas = await this.encomendasRepository.getAllEncomendas();
            return allEncomendas || [];
        } catch (error) {
            console.log(error.message)
            throw new BadRequestException(error.message || 'Erro ao buscar encomendas')
        }
    }
    
    async getEncomendaById(encomendaID: string): Promise<Encomendas>{
        try {
            const existEncomenda = await this.encomendasRepository.getEncomendaById(encomendaID)
            if(!existEncomenda) throw new BadRequestException('Encomenda não encontrada')

            return existEncomenda;
        } catch (error) {
            console.log(error.message)
            throw new BadRequestException(error.message || 'Erro ao buscar Encomenda pelo ID');
        }
    }

    async createEncomenda(newEncomenda: EncomendasDTO): Promise<Encomendas>{
        try {
            const createdEncomenda = await this.encomendasRepository.createEncomenda(newEncomenda);
            if(!createdEncomenda) throw new BadRequestException('Falha ao criar Nova Encomenda');
            
            return createdEncomenda;
        } catch (error) {
            console.log(error.message)
            throw new BadRequestException(error.message || 'Erro ao criar encomenda')
        }
    }

    async updateEncomenda(encomendaID: string, encomendaData: updateEncomendaDTO): Promise<Encomendas>{
        try {
            const existEncomenda = await this.encomendasRepository.getEncomendaById(encomendaID);
            if(!existEncomenda) throw new BadRequestException('Encomenda não encontrada');

            return await this.encomendasRepository.updateEncomenda(encomendaID, encomendaData);
        } catch (error) {
            console.log(error.message)
            throw new BadRequestException(error.message || 'Erro ao atualizar encomenda');
        }
    }

    async deleteEncomenda(encomendaID: string): Promise<void>{
        try {
            const encomendaToDel = await this.encomendasRepository.getEncomendaById(encomendaID);
            if(!encomendaToDel) throw new BadRequestException('Encomenda não encontrada')

            await this.encomendasRepository.deleteEncomenda(encomendaID);
        } catch (error) {
            console.log(error.message)
            throw new BadRequestException(error.message || 'Erro ao excluir encomenda')
        }
    }
}
