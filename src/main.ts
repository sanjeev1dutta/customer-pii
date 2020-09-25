import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger/dist/document-builder';
import { SwaggerModule } from '@nestjs/swagger/dist/swagger-module';
import { AppModule } from './app.module';
import * as config from 'config';

async function bootstrap() {
  const serverConfig = config.get('server');

  const app = await NestFactory.create(AppModule);
  const port = process?.env?.PORT || serverConfig.port;
  const region = process?.env?.REGION?.toUpperCase() || serverConfig.region;

  app.enableCors();
  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Car Rental Gateway')
    .setDescription('The Car Rental Gateway API description')
    .setVersion('1.0')
    .addTag(
      `Car Rental Gateway PII endpoint (${
        region == 'EU' || region == 'UK' ? 'European Union' : 'United States'
      })`,
    )
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(port, () => {
    console.log(
      `Car Rental Gateway customer PII endpoint listening on port: ${port}`,
    );
  });
}
bootstrap();
