import { Body, Controller, Get, Request, Post, UnauthorizedException, Param, BadRequestException } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthEmployeeDTO } from 'src/dto/authEmployee.dto';
import { EmployeeDTO } from 'src/dto/employee.dto';
import { EmployeeService } from 'src/services/employee/employee.service';

@ApiTags('funcionarios')
@Controller('employee')
export class EmployeeController {

    constructor(
        private readonly employeeService: EmployeeService
    ){}

    //Rota para listar todos os funcionarios do sistema
    @Get('/')
    async getEmployees(@Request() req: Request): Promise<EmployeeDTO[]>{
        const user = req['user'];
        if (!user) throw new UnauthorizedException('Usuario não autorizado');

        return await this.employeeService.getEmployees();   
    }

    //Rota de Informações do perfil do funcionario
    @ApiParam({
        name: 'employeeID',
        type: 'string',
    })
    @Get('/:employeeID')
    async getEmployeeById(@Param() { employeeID }): Promise<EmployeeDTO>{
        if (!employeeID) throw new BadRequestException('Nenhum ID informado')
        return await this.employeeService.getEmployeeById(employeeID);
    }

    //Rota de login para o funcionario
    @Post('/auth')
    async authEmployee(@Body() { email, password }: AuthEmployeeDTO): Promise<{access_token: string}>{
        const employeeData = { email, password };
        return await this.employeeService.authEmployee(employeeData);
    }

    //Rota para criar novos funcionarios
    @Post('/create')
    async saveEmployee(@Body() newEmployee: EmployeeDTO): Promise<Object>{
        const createdEmployee = await this.employeeService.createEmployee(newEmployee);

        if(createdEmployee) return {message: 'Funcionario criado com sucesso'}
    }
}
