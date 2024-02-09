import { Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import { Employee } from "../interfaces/employee.interface";
import { AuthEmployeeDTO } from "src/dto/authEmployee.dto";
import { EmployeeDTO } from "src/dto/employee.dto";

@Injectable()
export class EmployeeRepository{

    constructor(
        @InjectModel('employee') private readonly employeeModel: Model<Employee>
    ){}

    async getEmployees(): Promise<Employee[]>{
        return await this.employeeModel.find().select('-password');
    }

    async authEmployee(employeeData: AuthEmployeeDTO): Promise<Employee>{
        return await this.employeeModel.findOne({email: employeeData.email, password: employeeData.password});
    }
    
    async createEmployee(newEmployee: EmployeeDTO): Promise<Employee>{
        return await this.employeeModel.create(newEmployee);
    }
}