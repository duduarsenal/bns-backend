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

import { FuncionariosController } from './controllers/funcionarios/funcionarios.controller';
import { FuncionariosService } from './services/funcionarios/funcionarios.service';
import { FuncionariosSchema } from './mongo/schemas/funcionarios.schema';
import { FuncionariosRepository } from './mongo/repository/funcionarios.repository';

import { MoradoresController } from './controllers/moradores/moradores.controller';
import { MoradoresService } from './services/moradores/moradores.service';
import { MoradoresSchema } from './mongo/schemas/moradores.schema';
import { MoradoresRepository } from './mongo/repository/moradores.repository';

import { ResidenciasController } from './controllers/residencias/residencias.controller';
import { ResidenciasService } from './services/residencias/residencias.service';
import { ResidenciasSchema } from './mongo/schemas/residencias.schema';
import { ResidenciasRepository } from './mongo/repository/residencias.repository';

import { EncomendasSchema } from './mongo/schemas/encomendas.schema';
import { EncomendasController } from './controllers/encomendas/encomendas.controller';
import { EncomendasService } from './services/encomendas/encomendas.service';
import { EncomendasRepository } from './mongo/repository/encomendas.repository';

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
      { name: 'funcionarios', schema: FuncionariosSchema },
      { name: 'moradores', schema: MoradoresSchema },
      { name: 'residencias', schema: ResidenciasSchema },
      { name: 'encomendas', schema: EncomendasSchema },
    ]),
  ],
  controllers: [FuncionariosController, MoradoresController, ResidenciasController, EncomendasController],
  providers: [
    FuncionariosService,
    FuncionariosRepository,
    MoradoresService,
    MoradoresRepository,
    ResidenciasService,
    ResidenciasRepository,
    EncomendasService,
    EncomendasRepository
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware) //Autenticação de NIVEL NORMAL
      .forRoutes(
        //Funcionarios
        { path: '/funcionarios', method: RequestMethod.GET },
        { path: '/funcionarios/:funcionarioID', method: RequestMethod.GET },
        //Moradores
        { path: '/moradores', method: RequestMethod.GET },
        { path: '/moradores/:moradorID', method: RequestMethod.GET },
        { path: '/moradores/create', method: RequestMethod.POST },
        { path: '/moradores/:moradorID', method: RequestMethod.PATCH },
        { path: '/moradores/:moradorID', method: RequestMethod.DELETE },
        //Residências
        { path: '/residencias', method: RequestMethod.GET },
        { path: '/residencias/filterby', method: RequestMethod.POST },
        { path: '/residencias/:residenciaID', method: RequestMethod.PATCH },
        //Encomendas
        { path: '/encomendas', method: RequestMethod.GET },
        { path: '/encomendas/:encomendaID', method: RequestMethod.GET },
        { path: '/encomendas/create', method: RequestMethod.POST },
        { path: '/encomendas/:encomendaID', method: RequestMethod.PATCH },
        { path: '/encomendas/:encomendaID', method: RequestMethod.DELETE },
      )
      .apply(AuthAdminMiddleware) //Autenticação de NIVEL ADMIN
      .forRoutes(
        // { path: '/funcionarios/create', method: RequestMethod.POST },
        { path: '/residencias/create', method: RequestMethod.POST },
      );
  }
}
