import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ResidenciasDTO } from 'src/dto/residencias.dto';
import { Residencias } from 'src/mongo/interfaces/residencias.interface';
import { ResidenciasService } from 'src/services/residencias/residencias.service';

@ApiTags('residencias')
@Controller('residencias')
export class ResidenciasController {
    constructor(private readonly residenciaService: ResidenciasService) {}

    
    //Rota para buscar todas as residências
    @Get('/')
    async getAllResidencias(): Promise<Residencias[]>{
        return await this.residenciaService.getAllResidencias();
    }

    //Rota para buscar uma residência com base em um filtro
    @Post('/filter')
    async getResidenciaByFilter(@Body() residenciaData: ResidenciasDTO): Promise<Residencias>{
        return await this.residenciaService.getResidenciaByFilter(residenciaData);
    }

    @Post('/create')
    async createResidencia(@Body() newResidencia: ResidenciasDTO): Promise<Object>{
        const createdResidencia = await this.residenciaService.createResidencia(newResidencia);

        if (createdResidencia) return { status: 200, error: false, message: 'Residencia criada com sucesso' };
    }

}
