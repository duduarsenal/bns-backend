import { Body, Controller, Get, Param, Post, Request, UnauthorizedException } from '@nestjs/common';
import { MoradoresDTO } from 'src/dto/moradores.dto';
import { Moradores } from 'src/mongo/interfaces/moradores.interface';
import { MoradoresService } from 'src/services/moradores/moradores.service';

@Controller('moradores')
export class MoradoresController {
  constructor(private readonly moradoresService: MoradoresService) {}

  //Rota para listar todos os moradores do sistema
  @Get('/')
  async getMoradores(@Request() req: Request): Promise<Moradores[]> {
    // const user = req['user'];
    // if (!user) throw new UnauthorizedException('Usuario não autorizado');

    return await this.moradoresService.getMoradores();
  }

  // //Rota de Informações do perfil do funcionario
  // @Get('/:moradoresID')
  // async getMoradorById(@Param() { moradorID }, @Request() req: Request): Promise<MoradoresDTO> {
  //   // const user = req['user'];
  //   return await this.moradoresService.getMoradorById(moradorID);
  // }

  //Rota para criar novos funcionarios
  @Post('/create')
  async createMorador(@Body() newMorador: MoradoresDTO): Promise<Object> {
    const createdMorador = await this.moradoresService.createMorador(newMorador);

    if (createdMorador) return { message: 'Morador criado com sucesso' };
  }
}
