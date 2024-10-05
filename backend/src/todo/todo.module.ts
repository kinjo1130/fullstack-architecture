import { Module } from "@nestjs/common";
import { TodoController } from "./todo.controller";
import { TodoService } from "./todo.service";
import { PrismaService } from "src/common/prisma.service";

@Module({
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule { }
