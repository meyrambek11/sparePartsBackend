import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

export enum SortingElements {
  name = "name",
  article_number = "used",
  amount = "amount",
  price = "price",
}

export enum SortingBy {
  ASC = "ASC",
  DESC = "DESC",
}

export class SortSparePartDto {
  @IsOptional()
  @IsEnum(SortingElements)
  readonly sortingElement: SortingElements;

  @IsOptional()
  @IsEnum(SortingBy)
  readonly sortingBy: SortingBy;

  //   @IsOptional()
  //   //   @IsNumber()
  //   readonly page: number;

  //   @IsOptional()
  //   //   @IsNumber()
  //   readonly pageSize: number;
}
