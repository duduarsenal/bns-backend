import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MoradoresDTO } from 'src/dto/moradores.dto';
import { parcialResidenciaDTO } from 'src/dto/residencias.dto';
import { Moradores } from 'src/mongo/interfaces/moradores.interface';
import { MoradoresService } from 'src/services/moradores/moradores.service';

@ApiTags('Moradores')
@Controller('moradores')
export class MoradoresController {
  constructor(private readonly moradoresService: MoradoresService) {}

  //Rota para listar todos os moradores do sistema
  @Get('/')
  async getMoradores(): Promise<Moradores[]> {
    return await this.moradoresService.getMoradores();
  }

  //Rota de Informações do perfil do morador
  @Get('/:moradorID')
  async getMoradorById(@Param('moradorID') moradorID: string): Promise<Moradores> {
    return await this.moradoresService.getMoradorById(moradorID);
  }

  @Post('/filterbyblocoap')
  async getMoradorByBlocoAp(@Body() {bloco, apartamento}: parcialResidenciaDTO): Promise<Moradores>{
      return await this.moradoresService.getMoradorByBlocoAp({bloco, apartamento});
  }

  //Rota para criar novos moradores
  @Post('/create')
  async createMorador(@Body() newMorador: MoradoresDTO): Promise<object> {
    const createdMorador = await this.moradoresService.createMorador(newMorador);
    if (createdMorador) return { status: 200, error: false, message: 'Morador criado com sucesso' };
  }

  //Rota para atualizar as informações de algum morador
  @Patch('/:moradorID')
  async updateMorador(@Param('moradorID') moradorID: string, @Body() moradorData: MoradoresDTO): Promise<Moradores>{
    return await this.moradoresService.updateMorador(moradorID, moradorData)
  }

  //Rota para deletar algum morador do sistema
  @Delete('/:moradorID')
  async deleteMorador(@Param('moradorID') moradorID: string): Promise<object>{
    await this.moradoresService.deleteMorador(moradorID);
    return { status: 200, error: false, message: 'Morador deletado do sistema com sucesso' }
  }
}
