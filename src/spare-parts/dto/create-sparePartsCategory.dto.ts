import { IsNotEmpty, IsString } from "class-validator";

export class CreateSparePartCategoryDto {
  @IsString()
  @IsNotEmpty({ message: "Поле name не может быть пустым." })
  readonly name: string;
}
