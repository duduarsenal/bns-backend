import { Module } from '@nestjs/common';
import { EmployeeController } from './controllers/employee/employee.controller';

@Module({
  imports: [],
  controllers: [EmployeeController],
  providers: [],
})
export class AppModule {}
