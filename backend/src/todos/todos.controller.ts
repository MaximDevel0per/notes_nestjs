// Der Controller definiert die HTTP-Endpunkte (die REST-API).
// Decorators wie @Get() entsprechen den Attributes [HttpGet] in ASP.NET.
//
// Resultierende Routen:
//   GET    /todos       → alle Todos
//   GET    /todos/:id   → ein Todo
//   POST   /todos       → Todo anlegen
//   PATCH  /todos/:id   → Todo ändern (Titel oder done)
//   DELETE /todos/:id   → Todo löschen
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { Todo } from './todo.interface';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todos') // Basis-Route: /todos
export class TodosController {
  // Dependency Injection: NestJS erzeugt den TodosService und
  // übergibt ihn hier automatisch – wie Constructor Injection in .NET.
  constructor(private readonly todosService: TodosService) {}

  @Get()
  findAll(): Todo[] {
    return this.todosService.findAll();
  }

  @Get(':id')
  // ParseIntPipe wandelt den URL-Parameter (immer ein String)
  // in eine Zahl um – und antwortet mit 400, wenn das nicht klappt.
  findOne(@Param('id', ParseIntPipe) id: number): Todo {
    return this.todosService.findOne(id);
  }

  @Post()
  // @Body() parst den JSON-Body und validiert ihn gegen CreateTodoDto
  // (dank der globalen ValidationPipe aus main.ts).
  create(@Body() dto: CreateTodoDto): Todo {
    return this.todosService.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTodoDto,
  ): Todo {
    return this.todosService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204) // 204 No Content – üblich für erfolgreiches Löschen
  remove(@Param('id', ParseIntPipe) id: number): void {
    this.todosService.remove(id);
  }
}
