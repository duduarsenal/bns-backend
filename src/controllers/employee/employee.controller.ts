import { Body, Controller, Get, Request, Post, UnauthorizedException } from '@nestjs/common';
import { AuthEmployeeDTO } from 'src/dto/authEmployee.dto';
import { EmployeeDTO } from 'src/dto/employee.dto';
import { EmployeeService } from 'src/services/employee/employee.service';


@Controller('employee')
export class EmployeeController {

    constructor(
        private readonly employeeService: EmployeeService
    ){}

    @Get()
    async getEmployees(@Request() req: Request): Promise<EmployeeDTO[]>{
        const user = req['user'];
        if (!user) throw new UnauthorizedException('Usuario não autorizado');

        return await this.employeeService.getEmployees();        
    }

    @Post('/auth')
    async authEmployee(@Body() { email, password }: AuthEmployeeDTO): Promise<{access_token: string}>{
        const employeeData = { email, password };
        return await this.employeeService.authEmployee(employeeData);
    }

    @Post('/create')
    async saveEmployee(@Body() newEmployee: EmployeeDTO): Promise<Object>{
        const createdEmployee = await this.employeeService.createEmployee(newEmployee);

        if(createdEmployee) return {message: 'Funcionario criado com sucesso'}
    }
}
