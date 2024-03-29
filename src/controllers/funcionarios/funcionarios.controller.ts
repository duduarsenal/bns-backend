import { Body, Controller, Get, Request, Post, UnauthorizedException, Param, BadRequestException } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthFuncionariosDTO } from 'src/dto/authFuncionarios.dto';
import { FuncionariosDTO } from 'src/dto/funcionarios.dto';
import { FuncionariosService } from 'src/services/funcionarios/funcionarios.service';

@ApiTags('Funcionarios')
@Controller('funcionarios')
export class FuncionariosController {

    constructor(
        private readonly funcionariosService: FuncionariosService
    ){}

    //Rota para listar todos os funcionarios do sistema
    @Get('/')
    async getFuncionarios(@Request() req: Request): Promise<FuncionariosDTO[]>{
        const user = req['user'];
        if (!user) throw new UnauthorizedException('Usuario não autorizado');

        return await this.funcionariosService.getFuncionarios();   
    }

    //Rota de Informações do perfil do funcionario
    @Get('/session')
    async validateSession(@Request() req: Request){
        const user = req['user'];
        if (!user) throw new UnauthorizedException('Usuario não autorizado')

        return {user_name: user.name, user_token: user.user_token}
    }
    
    @Get('/:funcionariosID')
    async getFuncionarioById(@Param('funcionariosID') funcionariosID: string): Promise<FuncionariosDTO>{
        return await this.funcionariosService.getFuncionarioById(funcionariosID);
    }

    //Rota para validar sessão do usuario (token jwt)

    //Rota de login para o funcionario
    @Post('/auth')
    async authFuncionario(@Body() { email, password }: AuthFuncionariosDTO): Promise<{}>{
        return await this.funcionariosService.authFuncionario({ email, password });
    }

    //Rota para criar novos funcionarios
    @Post('/create')
    async createFuncionario(@Body() newFuncionario: FuncionariosDTO): Promise<object>{
        const createdFuncionario = await this.funcionariosService.createFuncionario(newFuncionario);
        if(createdFuncionario) return { status: 200, error: false, message: 'Funcionario criado com sucesso'}
    }
}
