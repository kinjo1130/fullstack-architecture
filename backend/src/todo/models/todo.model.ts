import { Field, ObjectType } from '@nestjs/graphql';

// modelsはGraphQLがmutationやqueryを実行した時に、どんな値を返すのかを定義する場所
@ObjectType()
export class Todo {
  @Field(() => String) // GraphQLの型を指定
  id: string;
  @Field(() => String)
  title: string;
  @Field(() => Boolean)
  completed: boolean;
}
