// DTO = Data Transfer Object. Definiert die Form des Request-Bodys.
// Die Decorators von class-validator prüfen eingehende Daten automatisch
// (aktiviert durch die globale ValidationPipe in main.ts).
// Ungültige Requests bekommen eine 400-Antwort mit Fehlermeldung.
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty({ message: 'title darf nicht leer sein' })
  @MaxLength(200)
  title: string;
}
