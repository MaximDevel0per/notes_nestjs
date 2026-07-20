// Der Service enthält die Geschäftslogik und hält hier auch die Daten
// (nur im Speicher – bei Neustart ist alles weg. Später könnte man
// hier eine echte Datenbank anbinden, ohne den Controller zu ändern).
//
// @Injectable() macht die Klasse für NestJS' Dependency-Injection-
// Container verfügbar – vergleichbar mit services.AddScoped<>() in ASP.NET.
import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './todo.interface';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
  // Unsere "Datenbank": ein simples Array.
  private todos: Todo[] = [
    { id: 1, title: 'NestJS lernen', done: false, createdAt: new Date().toISOString() },
    { id: 2, title: 'React-Frontend anschauen', done: false, createdAt: new Date().toISOString() },
  ];
  private nextId = 3;

  findAll(): Todo[] {
    return this.todos;
  }

  findOne(id: number): Todo {
    const todo = this.todos.find((t) => t.id === id);
    if (!todo) {
      // NestJS wandelt diese Exception automatisch in eine
      // HTTP-404-Antwort mit sauberem JSON-Body um.
      throw new NotFoundException(`Todo mit ID ${id} nicht gefunden`);
    }
    return todo;
  }

  create(dto: CreateTodoDto): Todo {
    const todo: Todo = {
      id: this.nextId++,
      title: dto.title,
      done: false,
      createdAt: new Date().toISOString(),
    };
    this.todos.push(todo);
    return todo;
  }

  update(id: number, dto: UpdateTodoDto): Todo {
    const todo = this.findOne(id); // wirft 404, falls nicht vorhanden
    // Object.assign kopiert nur die Felder, die im DTO gesetzt sind.
    Object.assign(todo, dto);
    return todo;
  }

  remove(id: number): void {
    this.findOne(id); // wirft 404, falls nicht vorhanden
    this.todos = this.todos.filter((t) => t.id !== id);
  }
}
