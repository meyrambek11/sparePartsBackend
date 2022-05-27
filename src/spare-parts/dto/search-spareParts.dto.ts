import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class SearchSparePartDto {
  @IsOptional()
  @IsString()
  readonly name: string;

  @IsOptional()
  readonly page: number;

  @IsOptional()
  readonly pageSize: number;
}
