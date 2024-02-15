import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EncomendasDTO, updateEncomendaDTO } from 'src/dto/encomendas.dto';
import { Encomendas } from 'src/mongo/interfaces/encomendas.interface';
import { EncomendasService } from 'src/services/encomendas/encomendas.service';

@ApiTags('Encomendas')
@Controller('encomendas')
export class EncomendasController {

    constructor(
        private readonly encomendasService: EncomendasService
    ){}

    @Get('/')
    async getAllEncomendas(): Promise<Encomendas[]>{
        return await this.encomendasService.getAllEncomendas();
    }

    @Get('/:encomendaID')
    async getEncomendaById(@Param('encomendaID') encomendaID: string): Promise<Encomendas>{
        return await this.encomendasService.getEncomendaById(encomendaID)
    }

    @Post('/create')
    async createEncomenda(@Body() newEncomenda: EncomendasDTO): Promise<object>{
        const payload = {
            destinatario: newEncomenda.destinatario,
            residencia: newEncomenda.residencia,
            codrastreio: newEncomenda.codrastreio,
            status: newEncomenda.status,
            recebedor: newEncomenda.recebedor || '',
            dtchegada: newEncomenda.dtchegada,
            dtretirada: newEncomenda.dtretirada || null
        }
        const createdEncomenda = await this.encomendasService.createEncomenda(payload);
        if (createdEncomenda) return { status: 200, error: false, message: 'Encomenda criada com sucesso' };
    }

    @Patch('/:encomendaID')
    async updateEncomenda(@Param('encomendaID') encomendaID: string, @Body() encomendaData: updateEncomendaDTO): Promise<Encomendas>{
        return await this.encomendasService.updateEncomenda(encomendaID, encomendaData)
    }

    @Delete('/:encomendaID')
    async deleteEncomenda(@Param('encomendaID') encomendaID: string): Promise<object>{
        await this.encomendasService.deleteEncomenda(encomendaID);
        return { status: 200, error: false, message: 'Encomenda excluida com sucesso' };
    }
}
