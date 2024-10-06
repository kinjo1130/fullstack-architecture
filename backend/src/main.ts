import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import * as fs from "fs";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // CORSの設定
  // グローバルでCORSを有効にする
  app.enableCors({
    origin: "*", // Next.jsフロントエンドのURL
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true,
  });
  const config = new DocumentBuilder()
    .setTitle("Todos API")
    .setDescription("The Todos API description")
    .setVersion("0.1")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
  // 生成したswagger.jsonを表示するためのエンドポイントを追加
  fs.writeFileSync("../swagger.json", JSON.stringify(document, undefined, 2));

  const port = Number(process.env.PORT) || 8080;
  await app.listen(port, "0.0.0.0");
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
