import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { GraphQLModule } from "@nestjs/graphql";
import { TodoModule } from "./todo/todo.module";
import * as path from "path";
import { ApolloDriver } from "@nestjs/apollo";
import { PrismaService } from "./common/prisma.service";
import { PrismaModule } from "./common/prisma.module";

@Module({
  imports: [TodoModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
