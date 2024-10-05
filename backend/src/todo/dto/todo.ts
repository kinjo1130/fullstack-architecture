import { ApiProperty } from "@nestjs/swagger";

export class TodoDto {
  @ApiProperty({
    example: "1",
    description: "todoのID",
  })
  id: string;

  @ApiProperty({
    example: "NestJSの学習",
    description: "タイトル",
  })
  title: string;

  @ApiProperty({ example: false, description: "todoの完了状態" })
  completed: boolean;

  @ApiProperty({
    example: "2024-10-05T14:48:00.000Z",
    description: "作成日",
  })
  createdAt: Date;

  @ApiProperty({
    example: "2024-10-05T14:48:00.000Z",
    description: "更新日",
  })
  updatedAt: Date;
}
