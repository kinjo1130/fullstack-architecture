import { Module } from '@nestjs/common';
import { TodoResolver } from './todo.resolvers';

@Module({
  providers: [TodoResolver],
})
export class TodoModule { }
