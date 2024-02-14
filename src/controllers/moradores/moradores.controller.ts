import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UnauthorizedException } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { MoradoresDTO } from 'src/dto/moradores.dto';
import { Moradores } from 'src/mongo/interfaces/moradores.interface';
import { MoradoresService } from 'src/services/moradores/moradores.service';

@ApiTags('Moradores')
@Controller('moradores')
export class MoradoresController {
  constructor(private readonly moradoresService: MoradoresService) {}

  //Rota para listar todos os moradores do sistema
  @Get('/')
  async getMoradores(@Request() req: Request): Promise<Moradores[]> {
    const user = req['user'];
    if (!user) throw new UnauthorizedException('Usuario não autorizado');

    return await this.moradoresService.getMoradores();
  }

  //Rota de Informações do perfil do morador
  @ApiParam({
    name: 'moradorID',
    type: 'string',
  })
  @Get('/:moradorID')
  async getMoradorById(@Param() { moradorID }, @Request() req: Request): Promise<Moradores> {
    const user = req['user'];
    if (!user) throw new UnauthorizedException('Usuario não autorizado')

    return await this.moradoresService.getMoradorById(moradorID);
  }

  //Rota para criar novos funcionarios
  @Post('/create')
  async createMorador(@Body() newMorador: MoradoresDTO): Promise<Object> {
    const createdMorador = await this.moradoresService.createMorador(newMorador);
    if (createdMorador) return { message: 'Morador criado com sucesso' };
  }

  @ApiParam({
    name: 'moradorID',
    type: 'string',
  })
  @Patch('/:moradorID')
  async updateMorador(@Param() { moradorID }, @Body() moradorData: MoradoresDTO, @Request() req: Request): Promise<Moradores>{
    const user = req['user'];
    if (!user) throw new UnauthorizedException('Usuario não autorizado')

    return await this.moradoresService.updateMorador(moradorID, moradorData)
  }

  @ApiParam({
    name: 'moradorID',
    type: 'string',
  })
  @Delete('/:moradorID')
  async deleteMorador(@Param() { moradorID }, @Request() req: Request):Promise<Object>{
    const user = req['user'];
    if (!user) throw new UnauthorizedException('Usuario não autorizado')

    await this.moradoresService.deleteMorador(moradorID);
    return { status: 200, error: false, message: 'Morador deletado do sistema com sucesso' }
  }
}
