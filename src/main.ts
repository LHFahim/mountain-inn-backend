import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Server is starting up!');
  const app = await NestFactory.create(AppModule);

  const configService: ConfigService = app.get(ConfigService);
  const PORT = configService.get('PORT');

  const validationPipe = new ValidationPipe({
    whitelist: true,
    stopAtFirstError: true,
    transform: true,
    transformOptions: {
      enableCircularCheck: true,
      exposeDefaultValues: true,
    },
  });

  app.useGlobalPipes(validationPipe);

  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Mountain Inn')
    .setDescription('Mountain Inn API description')
    .addBearerAuth({
      description: 'JWT Token',
      type: 'http',
      name: 'Authorization',
      bearerFormat: 'JWT',
    })
    .setVersion('1.0')
    .addTag('Mountain Inn Backend')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      syntaxHighlight: {
        activate: true,
        theme: 'obsidian',
      },
      docExpansion: 'none',
      displayRequestDuration: true,
      defaultModelExpandDepth: 8,
      defaultModelsExpandDepth: 8,
    },
    customSiteTitle: 'Mountain Inn API Docs',
  });

  await app.listen(5000);
  logger.log(`Server started on http://localhost:${PORT}/api`);
}
bootstrap();
