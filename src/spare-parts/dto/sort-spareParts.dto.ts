import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

export enum SortingElements {
  name = "name",
  article_number = "article_number",
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
  //   readonly page: number;

  //   @IsOptional()
  //   readonly pageSize: number;
}
