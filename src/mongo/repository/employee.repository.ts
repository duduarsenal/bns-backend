import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import { Employee } from "../interfaces/employee.interface";
import { AuthEmployeeDTO } from "src/dto/authEmployee.dto";
import { EmployeeDTO } from "src/dto/employee.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class EmployeeRepository{

    constructor(
        @InjectModel('employee') private readonly employeeModel: Model<Employee>
    ){}

    async getEmployees(): Promise<Employee[]>{
        return await this.employeeModel.find()
    }

    async getEmployeeById(employeeID: string): Promise<Employee>{
        return await this.employeeModel.findById({_id: employeeID}).select('-permission');
    }

    async authEmployee(employeeData: AuthEmployeeDTO): Promise<Employee>{
        const user = await this.employeeModel.findOne({email: employeeData.email}).select('+password');
        if (!user) throw new BadRequestException('Usuario não existe');

        const matchPassword = await bcrypt.compare(employeeData.password, user.password);
        if (!matchPassword) throw new UnauthorizedException('Usuario ou senha incorretos');

        return await this.employeeModel.findOne({email: employeeData.email});
    }
    
    async createEmployee(newEmployee: EmployeeDTO): Promise<Employee>{
        const user = await this.employeeModel.findOne({email: newEmployee.email});
        if (user) throw new BadRequestException('Usuario ja existe');

        return await this.employeeModel.create(newEmployee);
    }
}