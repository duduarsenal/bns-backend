import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AuthMiddleware } from './middlewares/auth.middleware';
import { AuthAdminMiddleware } from './middlewares/admin.middleware';

import { EmployeeController } from './controllers/employee/employee.controller';
import { EmployeeService } from './services/employee/employee.service';
import { EmployeeRepository } from './mongo/repository/employee.repository';
import { EmployeeSchema } from './mongo/schemas/employee.schema';

import { MoradoresSchema } from './mongo/schemas/moradores.schema';
import { MoradoresController } from './controllers/moradores/moradores.controller';
import { MoradoresService } from './services/moradores/moradores.service';
import { MoradoresRepository } from './mongo/repository/moradores.repository';

import { ResidenciasService } from './services/residencias/residencias.service';
import { ResidenciasRepository } from './mongo/repository/residencias.repository';
import { ResidenciasController } from './controllers/residencias/residencias.controller';
import { ResidenciasSchema } from './mongo/schemas/residencias.schema';

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
      { name: 'employee', schema: EmployeeSchema },
      { name: 'moradores', schema: MoradoresSchema },
      { name: 'residencias', schema: ResidenciasSchema },
    ]),
  ],
  controllers: [EmployeeController, MoradoresController, ResidenciasController],
  providers: [
    EmployeeService,
    EmployeeRepository,
    MoradoresService,
    MoradoresRepository,
    ResidenciasService,
    ResidenciasRepository,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware) //Autenticação de NIVEL NORMAL
      .forRoutes(
        { path: '/employee', method: RequestMethod.GET },
        { path: '/moradores', method: RequestMethod.GET },
        { path: '/moradores/:moradorID', method: RequestMethod.GET },
        { path: '/moradores/:moradorID', method: RequestMethod.DELETE },
        { path: '/moradores/:moradorID', method: RequestMethod.PATCH },
      )
      .apply(AuthAdminMiddleware) //Autenticação de NIVEL ADMIN
      .forRoutes({ path: '/employee/create', method: RequestMethod.POST });
  }
}
