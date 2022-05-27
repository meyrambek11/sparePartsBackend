import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class SearchSparePartDto {
  @IsOptional()
  @IsString()
  readonly name: string;

  @IsOptional()
  //   @IsNumber()
  readonly page: number;

  @IsOptional()
  //   @IsNumber()
  readonly pageSize: number;
}
