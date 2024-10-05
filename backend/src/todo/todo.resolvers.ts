import { Query, Resolver } from '@nestjs/graphql';
import { Todo } from './models/todo.model';

@Resolver(() => Todo)
export class TodoResolver {
  constructor() {}
  @Query(() => [Todo], {
    name: 'todos', // GraphQLのquery名で、todosというqueryで取得できるようになる
    nullable: true,
  })
  async getTodos() {
    return [
      {
        id: '1',
        title: 'Todo 1',
        completed: false,
      },
      {
        id: '2',
        title: 'Todo 2',
        completed: true,
      },
    ];
  }
}
