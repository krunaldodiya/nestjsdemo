import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from 'src/entity/todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
  public constructor(
    @InjectRepository(Todo) private readonly todoRepository: Repository<Todo>,
  ) {}

  async createTodo(title: string): Promise<Todo> {
    try {
      const todo = this.todoRepository.create({ title });
      return this.todoRepository.save(todo);
    } catch (error) {
      throw new Error('something went wrong');
    }
  }

  async deleteTodo(id: number): Promise<boolean> {
    try {
      this.todoRepository.delete(id);
      return true;
    } catch (error) {
      throw new Error('something went wrong');
    }
  }

  async markTodoAsCompleted(id: number): Promise<Todo> {
    try {
      await this.todoRepository.update({ id }, { completed: true });
      return this.findTodoById(id);
    } catch (error) {
      throw new Error('something went wrong');
    }
  }

  async getTodos(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  async findTodoById(id: number): Promise<Todo> {
    return this.todoRepository.findOne(id);
  }
}
