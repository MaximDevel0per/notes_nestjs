// Einstiegspunkt der Anwendung – vergleichbar mit Program.cs in ASP.NET Core.
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  // NestJS baut aus dem AppModule die komplette Anwendung zusammen.
  const app = await NestFactory.create(AppModule);

  // CORS erlauben, damit das React-Frontend (Port 5173)
  // Requests an dieses Backend (Port 3000) schicken darf.
  app.enableCors({ origin: 'http://localhost:5173' });

  // Globale Validierung: eingehende Bodies werden automatisch
  // gegen die DTO-Klassen geprüft (siehe dto/-Ordner).
  // whitelist: true entfernt Felder, die nicht im DTO stehen.
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    const config = new DocumentBuilder()
    .setTitle('Notes App')
    .setDescription('The notes API description')
    .setVersion('1.0')
    .addTag('notes')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  
  await app.listen(3000);
  console.log('Backend läuft auf http://localhost:3000');
}
bootstrap();
