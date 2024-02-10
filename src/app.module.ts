import { Module, NestModule, MiddlewareConsumer, RequestMethod  } from '@nestjs/common';
import { EmployeeController } from './controllers/employee/employee.controller';
import { EmployeeService } from './services/employee/employee.service';
import { EmployeeRepository } from './mongo/repository/employee.repository';
import { EmployeeSchema } from './mongo/schemas/employee.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { JwtModule } from '@nestjs/jwt';
import { AuthAdminMiddleware } from './middlewares/admin.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.SECRET,
      signOptions: { expiresIn: '12h' },
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    MongooseModule.forFeature([
      { name: 'employee', schema: EmployeeSchema }
    ])
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService, EmployeeRepository],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer ){
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '/employee', method: RequestMethod.GET})

    consumer
      .apply(AuthAdminMiddleware)
      .forRoutes({path: '/employee/create', method: RequestMethod.POST})
    
  }
}
