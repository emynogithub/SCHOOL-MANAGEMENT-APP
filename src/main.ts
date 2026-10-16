import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { Transform } from 'class-transformer';
import { SwaggerModule } from 'node_modules/@nestjs/swagger/dist/swagger-module';
import { DocumentBuilder } from 'node_modules/@nestjs/swagger/dist/document-builder';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  })
)

const config = new DocumentBuilder()
.setTitle('School API')
.setDescription('Api documentation School Management system!')
.setVersion('1.0')
.addBearerAuth()
.addTag('school')
.build();


const document = SwaggerModule.createDocument(app, config)

SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
