import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { SparePartsModule } from "./spare-parts/spare-parts.module";

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `.${process.env.NODE_ENV}.env` }),
    TypeOrmModule.forRoot({
      type: "postgres",
      url: process.env.DB_URL,
      entities: ["dist/**/**/*.entity{.js,.ts}"],
      synchronize: true,
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
      namingStrategy: new SnakeNamingStrategy(),
    }),
    SparePartsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
