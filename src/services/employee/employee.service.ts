import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthEmployeeDTO } from 'src/dto/authEmployee.dto';
import { EmployeeDTO } from 'src/dto/employee.dto';
import { Employee } from 'src/mongo/interfaces/employee.interface';
import { EmployeeRepository } from 'src/mongo/repository/employee.repository';

@Injectable()
export class EmployeeService {

    constructor(
        private readonly employeeRepository: EmployeeRepository,
        private jwtService: JwtService
    ){}

    async getEmployees(): Promise<Employee[]>{
        try{
            const allEmployees = await this.employeeRepository.getEmployees();

            return allEmployees || [];
        } catch (err) {
            console.error(err)
            throw new BadRequestException(err.message || 'Erro ao buscar todos os funcionarios');
        }
    }

    async authEmployee(employeeData: AuthEmployeeDTO): Promise<{ access_token: string }>{
        try {
            const existEmployee = await this.employeeRepository.authEmployee(employeeData);

            if (!existEmployee) throw new BadRequestException('Funcionario não existe')

            //CRIPTOGRAFAR E OCULTAR SENHA DO USUARIO
            const payload = {
                name: existEmployee.name, 
                email: existEmployee.email, 
                perm: existEmployee.permission
            }

            const token = await this.jwtService.signAsync(payload);

            if (!token) throw new UnauthorizedException('Falha ao gerar token');

            return {
                access_token: token
            };
        } catch (error) {
            throw new BadRequestException(error.message || 'Funcionario não existe')
        }
    }

    async createEmployee(newEmployee: EmployeeDTO): Promise<Employee>{
        try {
            const createdEmployee = await this.employeeRepository.createEmployee(newEmployee)

            if (!createdEmployee) throw new BadRequestException('Erro ao criar um funcionario')

            return createdEmployee;
        } catch (error) {
            throw new BadRequestException(error.message || 'Erro ao criar um funcionario')
        }
    }
}
