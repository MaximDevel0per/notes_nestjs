"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodosService = void 0;
// Der Service enthält die Geschäftslogik und hält hier auch die Daten
// (nur im Speicher – bei Neustart ist alles weg. Später könnte man
// hier eine echte Datenbank anbinden, ohne den Controller zu ändern).
//
// @Injectable() macht die Klasse für NestJS' Dependency-Injection-
// Container verfügbar – vergleichbar mit services.AddScoped<>() in ASP.NET.
const common_1 = require("@nestjs/common");
let TodosService = class TodosService {
    constructor() {
        // Unsere "Datenbank": ein simples Array.
        this.todos = [
            { id: 1, title: 'NestJS lernen', done: false, createdAt: new Date().toISOString() },
            { id: 2, title: 'React-Frontend anschauen', done: false, createdAt: new Date().toISOString() },
        ];
        this.nextId = 3;
    }
    findAll() {
        return this.todos;
    }
    findOne(id) {
        const todo = this.todos.find((t) => t.id === id);
        if (!todo) {
            // NestJS wandelt diese Exception automatisch in eine
            // HTTP-404-Antwort mit sauberem JSON-Body um.
            throw new common_1.NotFoundException(`Todo mit ID ${id} nicht gefunden`);
        }
        return todo;
    }
    create(dto) {
        const todo = {
            id: this.nextId++,
            title: dto.title,
            done: false,
            createdAt: new Date().toISOString(),
        };
        this.todos.push(todo);
        return todo;
    }
    update(id, dto) {
        const todo = this.findOne(id); // wirft 404, falls nicht vorhanden
        // Object.assign kopiert nur die Felder, die im DTO gesetzt sind.
        Object.assign(todo, dto);
        return todo;
    }
    remove(id) {
        this.findOne(id); // wirft 404, falls nicht vorhanden
        this.todos = this.todos.filter((t) => t.id !== id);
    }
};
exports.TodosService = TodosService;
exports.TodosService = TodosService = __decorate([
    (0, common_1.Injectable)()
], TodosService);
//# sourceMappingURL=todos.service.js.map