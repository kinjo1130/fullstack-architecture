import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { TodoService } from "./todo.service";
import { CreateTodoDto, TodoDto } from "./dto/todo";

@ApiTags("todos")
@Controller("todos")
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  @ApiOperation({ summary: "Todoの一覧が返ってきます" })
  @ApiResponse({
    status: 200,
    description: "Todoの一覧",
    type: [TodoDto],
  })
  async findAll(): Promise<TodoDto[]> {
    return this.todoService.getTodos();
  }

  @Post("create")
  @ApiOperation({ summary: "Todoを追加します" })
  @ApiResponse({
    status: 201,
    description: "Todoが追加されました",
    type: TodoDto,
  })
  async create(@Body() todo: CreateTodoDto): Promise<TodoDto> {
    return this.todoService.create(todo);
  }
}
