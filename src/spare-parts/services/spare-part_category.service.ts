import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateSparePartCategoryDto } from "../dto/create-sparePartsCategory.dto";
import { SparePartsCategory } from "../entity/spare-parts_category.entity";

@Injectable()
export class SparePartsCategoryService {
  constructor(
    @InjectRepository(SparePartsCategory)
    private sparePartsCategoryRepository: Repository<SparePartsCategory>
  ) {}

  async getAllSparePartsCategory(): Promise<SparePartsCategory[]> {
    return this.sparePartsCategoryRepository.find({ select: ["id", "name"] });
  }

  async createSparePartsCategory(
    dto: CreateSparePartCategoryDto
  ): Promise<SparePartsCategory> {
    return this.sparePartsCategoryRepository.save(dto);
  }

  async getOne(id: string): Promise<SparePartsCategory> {
    return await this.sparePartsCategoryRepository.findOne(id);
  }
}
