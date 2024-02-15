import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ResidenciasDTO, updateResidenciaDTO } from 'src/dto/residencias.dto';
import { Residencias } from 'src/mongo/interfaces/residencias.interface';
import { ResidenciasService } from 'src/services/residencias/residencias.service';

@ApiTags('Residências')
@Controller('residencias')
export class ResidenciasController {
    constructor(private readonly residenciaService: ResidenciasService) {}

    
    //Rota para buscar todas as residências
    @Get('/')
    async getAllResidencias(): Promise<Residencias[]>{
        return await this.residenciaService.getAllResidencias();
    }

    //Rota para buscar uma residência com base em um filtro
    @Post('/filterby')
    async getResidenciaByFilter(@Body() residenciaData: ResidenciasDTO): Promise<Residencias>{
        return await this.residenciaService.getResidenciaByFilter(residenciaData);
    }

    @Post('/create')
    async createResidencia(@Body() newResidencia: ResidenciasDTO): Promise<object>{
        const createdResidencia = await this.residenciaService.createResidencia(newResidencia);
        if (createdResidencia) return { status: 200, error: false, message: 'Residencia criada com sucesso' };
    }

    @Patch('/:residenciaID')
    async updateResidencia(@Param('residenciaID') residenciaID: string, @Body() residenciaData: updateResidenciaDTO): Promise<Residencias>{
        return await this.residenciaService.updateResidencia(residenciaID, residenciaData);
    }

}
