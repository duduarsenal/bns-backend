import { Body, Controller, Get, Post } from '@nestjs/common';
import { ResidenciasDTO } from 'src/dto/residencias.dto';
import { ResidenciasService } from 'src/services/residencias/residencias.service';

@Controller('residencias')
export class ResidenciasController {
    constructor(private readonly residenciaService: ResidenciasService) {}

    
    @Get('/')
    async getResidenciaByFilter(@Body() residenciaData: ResidenciasDTO): Promise<ResidenciasDTO>{
        return await this.residenciaService.getResidenciaByFilter(residenciaData);
    }

    @Post('/create')
    async createResidencia(@Body() newResidencia: ResidenciasDTO): Promise<Object>{
        const createdResidencia = await this.residenciaService.createResidencia(newResidencia);

    if (createdResidencia) return { message: 'Residencia criado com sucesso' };
    }

}
