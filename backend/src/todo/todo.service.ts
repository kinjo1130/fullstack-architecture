import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/common/prisma.service";
import { CreateTodoDto, TodoDto } from "./dto/todo";

@Injectable()
export class TodoService {
  constructor(private prismaService: PrismaService) {}
  async getTodos(): Promise<TodoDto[]> {
    return this.prismaService.todo.findMany();
  }
  async create(todo: CreateTodoDto): Promise<TodoDto> {
    return this.prismaService.todo.create({
      data: {
        title: todo.title,
        completed: false,
      },
    });
  }
  async update(todo: TodoDto): Promise<TodoDto> {
    return this.prismaService.todo.update({
      where: { id: todo.id },
      data: {
        title: todo.title,
        completed: todo.completed,
      },
    });
  }
  async delete(id: number): Promise<TodoDto> {
    const idString = id.toString();
    return this.prismaService.todo.delete({ where: { id: idString } });
  }
}
