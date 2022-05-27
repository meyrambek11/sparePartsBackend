import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { SparePartType } from "../entity/spare-parts.entity";
import { SparePartCarRelationship } from "../entity/spare-part_car_relationship.entity";

export class CreateSparePartDto {
  @IsString()
  @IsNotEmpty({ message: "Поле company_id не может быть пустым." })
  readonly company_id: string;

  @IsString()
  @IsNotEmpty({ message: "Поле dealer_id не может быть пустым." })
  readonly dealer_id: string;

  @IsString()
  @IsNotEmpty({ message: "Поле user_id не может быть пустым." })
  readonly user_id: string;

  @IsOptional()
  @IsString()
  readonly client_id?: string;

  @IsString({ message: "Тип поле name обязательно должен быть string" })
  @IsNotEmpty({ message: "Поле name не может быть пустым." })
  readonly name: string;

  @IsNumber()
  @IsNotEmpty({ message: "Поле price не может быть пустым." })
  readonly price: number;

  @IsNumber()
  @IsNotEmpty({ message: "Поле article_number не может быть пустым." })
  readonly article_number: number;

  @IsNumber()
  @IsNotEmpty({ message: "Поле amount не может быть пустым." })
  readonly amount: number;

  @IsString()
  readonly description: string;

  @IsOptional()
  @IsEnum(SparePartType)
  @IsNotEmpty({ message: "Поле type не может быть пустым." })
  readonly type: SparePartType;

  @IsString()
  @IsNotEmpty({ message: "Поле category_id не может быть пустым." })
  readonly sparePartsCategoryId: string;

  @IsOptional()
  @IsArray()
  readonly cars: SparePartCarRelationship[];
}
