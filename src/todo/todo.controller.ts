import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateTodoDto } from './dto/todo.dto';
import { Todo } from './interfaces/todo.interface';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  public constructor(private readonly todoService: TodoService) {}

  @Get()
  async findAll(): Promise<Todo[]> {
    return this.todoService.findAll();
  }

  @Post()
  async create(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.todoService.create(createTodoDto);
  }
}
