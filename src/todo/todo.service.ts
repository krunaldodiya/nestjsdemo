import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from 'src/entity/todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
  public constructor(
    @InjectRepository(Todo) private readonly todoRepository: Repository<Todo>,
  ) {}

  async create(title: string): Promise<Todo> {
    const todo = this.todoRepository.create({ title });
    return this.todoRepository.save(todo);
  }

  async delete(id: number): Promise<boolean> {
    try {
      this.todoRepository.delete(id);
      return true;
    } catch (error) {
      throw new Error('something went wrong');
    }
  }

  async findAll(): Promise<Todo[]> {
    return this.todoRepository.find();
  }
}
