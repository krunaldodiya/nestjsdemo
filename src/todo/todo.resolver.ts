import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Todo } from 'src/entity/todo.entity';
import { CreateTodoInput } from './dto/input/create-todo-input.dto';
import { TodoService } from './todo.service';

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
    return this.todoService.createTodo(createTodoInput.title);
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
}
