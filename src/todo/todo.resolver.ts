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

@Resolver(() => Todo)
export class TodoResolver {
  private pubSub: PubSub;

  constructor(private readonly todoService: TodoService) {
    this.pubSub = new PubSub();
  }

  @Query(() => [Todo])
  async getTodos(): Promise<Todo[]> {
    return this.todoService.getTodos();
  }

  @Mutation(() => Todo)
  async createTodo(
    @Args('createTodoInput') createTodoInput: CreateTodoInput,
  ): Promise<Todo> {
    const todo = await this.todoService.createTodo(createTodoInput.title);

    this.pubSub.publish('todoCreated', { todoCreated: todo });

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
    return this.pubSub.asyncIterator('todoCreated');
  }
}
