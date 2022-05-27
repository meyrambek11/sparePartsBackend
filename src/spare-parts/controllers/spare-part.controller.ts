import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { CreateSparePartDto } from "../dto/create-spareParts.dto";
import { SpareParts } from "../entity/spare-parts.entity";
import { SparePartsService } from "../services/spare-part.service";
import { DeleteResult, UpdateResult } from "typeorm";
import { UpdateSparePartDto } from "../dto/update-spareParts.dto";
import { SearchSparePartDto } from "../dto/search-spareParts.dto";
import { SortSparePartDto } from "../dto/sort-spareParts.dto";

@Controller("spare_parts")
export class SparePartsController {
  constructor(private readonly sparePartsService: SparePartsService) {}

  @Get()
  getAll(@Query() dto: SearchSparePartDto): Promise<SpareParts[]> {
    return this.sparePartsService.getAll(dto);
  }

  @Get("search")
  getAllBySearch(@Query() dto: SearchSparePartDto) {
    return this.sparePartsService.getAllBySearch(dto);
  }

  @Get("sorting")
  getAllBySorting(@Query() dto: SortSparePartDto): Promise<SpareParts[]> {
    return this.sparePartsService.getAllBySorting(dto);
  }

  @Post()
  createSpareParts(@Body() dto: CreateSparePartDto): Promise<SpareParts> {
    return this.sparePartsService.createSparePart(dto);
  }

  @Get(":id")
  getOne(@Param("id", ParseUUIDPipe) id: string): Promise<SpareParts> {
    return this.sparePartsService.getOne(id);
  }

  @Patch(":id")
  update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() dto: UpdateSparePartDto
  ): Promise<UpdateResult> {
    return this.sparePartsService.updateSparePart(id, dto);
  }

  @Delete(":id")
  destroy(@Param("id", ParseUUIDPipe) id: string) {
    return this.sparePartsService.destroy(id);
  }
}
