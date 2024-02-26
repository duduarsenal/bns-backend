import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('Bossa Nova Stay')
  .setDescription(
    'Aplicativo para gerenciar encomendas em prédios/condomínios, permitindo armazenar dados de entregas, status de retirada e informações dos moradores, incluindo histórico de encomendas anteriores.',
  )
  .setVersion('1.0')
  .addBearerAuth()
  .addSecurityRequirements('bearer')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/swagger', app, document);

  //Usar os validadores em todo nosso app
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(3030);
}
bootstrap();
