import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/common/prisma.service";
import { TodoDto } from "./dto/todo";

@Injectable()
export class TodoService {
  constructor(private prismaService: PrismaService) {}
  async getTodos(): Promise<TodoDto[]> {
    return this.prismaService.todo.findMany();
  }
}
