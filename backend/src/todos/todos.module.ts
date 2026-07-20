// Das Feature-Modul für Todos.
// - controllers: nehmen HTTP-Requests entgegen
// - providers: Services, die per Dependency Injection verteilt werden
import { Module } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';

@Module({
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}
