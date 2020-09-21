import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger/dist/document-builder';
import { SwaggerModule } from '@nestjs/swagger/dist/swagger-module';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process?.env?.PORT || 4000;
  const piidb = process?.env?.PIIDB?.toUpperCase() || 'EU';

  app.enableCors();
  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Car Rental Gateway')
    .setDescription('The Car Rental Gateway API description')
    .setVersion('1.0')
    .addTag(
      `Car Rental Gateway PII endpoint (${
        piidb == 'EU' || piidb == 'UK' ? 'European Union' : 'United States'
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
