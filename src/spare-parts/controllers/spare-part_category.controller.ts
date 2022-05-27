import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from "@nestjs/common";
import { CreateSparePartCategoryDto } from "../dto/create-sparePartsCategory.dto";
import { SparePartsCategory } from "../entity/spare-parts_category.entity";
import { SparePartsCategoryService } from "../services/spare-part_category.service";

@Controller("spare_parts_category")
export class SparePartsCategoryController {
  constructor(
    private readonly sparePartsCategoryService: SparePartsCategoryService
  ) {}

  @Get()
  getAll(): Promise<SparePartsCategory[]> {
    return this.sparePartsCategoryService.getAllSparePartsCategory();
  }

  @Get(":id")
  getOne(@Param("id", ParseIntPipe) id: string): Promise<SparePartsCategory> {
    return this.sparePartsCategoryService.getOne(id);
  }

  @Post()
  createSparePartsCategory(
    @Body() dto: CreateSparePartCategoryDto
  ): Promise<SparePartsCategory> {
    return this.sparePartsCategoryService.createSparePartsCategory(dto);
  }
}
