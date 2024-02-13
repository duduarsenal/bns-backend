import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('Bossa Nova Stay')
  .setDescription(
    'Aplicação feita para gerenciar encomendas dos condominios/prédios',
  )
  .setVersion('1.0')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  //Usar os validadores em todo nosso app
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3030);
}
bootstrap();
