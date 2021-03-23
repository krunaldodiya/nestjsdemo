import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTodoDto } from './dto/todo.dto';
import { Todo } from './interfaces/todo.interface';

@Injectable()
export class TodoService {
  public constructor(
    @InjectModel('Todo') private readonly todoModel: Model<Todo>,
  ) {}

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.todoModel.create({ title: createTodoDto.title });
  }

  async findAll(): Promise<Todo[]> {
    return this.todoModel.find();
  }
}
