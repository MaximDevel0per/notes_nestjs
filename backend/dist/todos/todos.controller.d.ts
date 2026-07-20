import { TodosService } from './todos.service';
import { Todo } from './todo.interface';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
export declare class TodosController {
    private readonly todosService;
    constructor(todosService: TodosService);
    findAll(): Todo[];
    findOne(id: number): Todo;
    create(dto: CreateTodoDto): Todo;
    update(id: number, dto: UpdateTodoDto): Todo;
    remove(id: number): void;
}
