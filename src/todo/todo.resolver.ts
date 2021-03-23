import {
  Args,
  Int,
  Mutation,
  Query,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { Todo } from 'src/entity/todo.entity';
import { CreateTodoInput } from './dto/input/create-todo-input.dto';
import { TodoService } from './todo.service';

const pubSub = new PubSub();
@Resolver(() => Todo)
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Query(() => [Todo])
  async getTodos(): Promise<Todo[]> {
    return this.todoService.getTodos();
  }

  @Mutation(() => Todo)
  async createTodo(
    @Args('createTodoInput') createTodoInput: CreateTodoInput,
  ): Promise<Todo> {
    const todo = await this.todoService.createTodo(createTodoInput.title);

    pubSub.publish('todoCreated', { todoCreated: todo });

    return todo;
  }

  @Mutation(() => Boolean)
  async deleteTodo(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<boolean> {
    return this.todoService.deleteTodo(id);
  }

  @Mutation(() => Todo)
  async markTodoAsCompleted(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Todo> {
    return this.todoService.markTodoAsCompleted(id);
  }

  @Subscription(() => Todo)
  async todoCreated() {
    return pubSub.asyncIterator('todoCreated');
  }
}
