import { Module } from '@nestjs/common';
import { EmployeeController } from './controllers/employee/employee.controller';
import { EmployeeService } from './services/employee/employee.service';
import { EmployeeRepository } from './mongo/repository/employee.repository';
import { EmployeeSchema } from './mongo/schemas/employee.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    MongooseModule.forFeature([
      { name: 'employee', schema: EmployeeSchema }
    ])
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService, EmployeeRepository],
})
export class AppModule {}
