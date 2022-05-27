import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { config } from "aws-sdk";

async function start() {
  try {
    config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });
    const PORT = process.env.PORT || 8000;
    const app = await NestFactory.create(AppModule);
    // app.setGlobalPrefix("api");
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(PORT, () =>
      console.log(`Server started on port = ${PORT}`)
    );
  } catch (error) {
    console.log(error);
  }
}
start();
