"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Einstiegspunkt der Anwendung – vergleichbar mit Program.cs in ASP.NET Core.
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    // NestJS baut aus dem AppModule die komplette Anwendung zusammen.
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    // CORS erlauben, damit das React-Frontend (Port 5173)
    // Requests an dieses Backend (Port 3000) schicken darf.
    app.enableCors({ origin: 'http://localhost:5173' });
    // Globale Validierung: eingehende Bodies werden automatisch
    // gegen die DTO-Klassen geprüft (siehe dto/-Ordner).
    // whitelist: true entfernt Felder, die nicht im DTO stehen.
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Notes App')
        .setDescription('The notes API description')
        .setVersion('1.0')
        .addTag('notes')
        .build();
    const documentFactory = () => swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, documentFactory);
    await app.listen(3000);
    console.log('Backend läuft auf http://localhost:3000');
}
bootstrap();
//# sourceMappingURL=main.js.map