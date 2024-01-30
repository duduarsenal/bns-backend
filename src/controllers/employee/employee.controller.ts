import { Body, Controller, Get, Post } from '@nestjs/common';
import { EmployeeDTO } from 'src/dto/employee.dto';


@Controller('employee')
export class EmployeeController {
    constructor(){}

    @Get()
    async authEmployee(@Body() employeeData: object) {
        return;
    }

    @Post()
    async saveEmployee(@Body() newEmployee: EmployeeDTO){
        return newEmployee;
    }
}
