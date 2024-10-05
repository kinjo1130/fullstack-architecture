import { Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

// ここでいろんなところで使うPrismaClientを継承してPrismaServiceを作成
// prismaSchemaで宣言した型が使える
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
