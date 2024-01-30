import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthEmployeeDTO } from 'src/dto/authEmployee.dto';
import { EmployeeDTO } from 'src/dto/employee.dto';
import { Employee } from 'src/mongo/interfaces/employee.interface';
import { EmployeeService } from 'src/services/employee/employee.service';


@Controller('employee')
export class EmployeeController {

    constructor(
        private readonly employeeService: EmployeeService
    ){}


    @Post('/auth')
    async authEmployee(@Body() { email, password }: AuthEmployeeDTO): Promise<Object>{
        const employeeData = { email, password };
        return await this.employeeService.authEmployee(employeeData);
    }

    @Post('create')
    async saveEmployee(@Body() newEmployee: EmployeeDTO): Promise<Object>{
        const createdEmployee = await this.employeeService.createEmployee(newEmployee);

        if(createdEmployee) return {message: 'Funcionario criado com sucesso'}}
}
