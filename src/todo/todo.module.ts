import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from 'src/entity/todo.entity';
import { TodoService } from './todo.service';
import { TodoResolver } from './todo.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  providers: [TodoService, TodoResolver],
})
export class TodoModule {}
