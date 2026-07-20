// Das Wurzelmodul. Module sind NestJS' Organisationseinheit:
// Sie bündeln zusammengehörige Controller und Services.
// Ähnlich wie in Angular – oder grob wie ein Projekt/Namespace in .NET.
import { Module } from '@nestjs/common';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [TodosModule], // weitere Feature-Module würden hier ergänzt
})
export class AppModule {}
