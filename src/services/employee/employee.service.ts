import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthEmployeeDTO } from 'src/dto/authEmployee.dto';
import { EmployeeDTO } from 'src/dto/employee.dto';
import { Employee } from 'src/mongo/interfaces/employee.interface';
import { EmployeeRepository } from 'src/mongo/repository/employee.repository';

@Injectable()
export class EmployeeService {

    constructor(
        private readonly employeeRepository: EmployeeRepository
    ){}

    async authEmployee(employeeData: AuthEmployeeDTO): Promise<Employee>{
        try {
            const existEmployee = await this.employeeRepository.authEmployee(employeeData);

            if (!existEmployee) throw new BadRequestException('Funcionario não existe')

            return existEmployee;
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
