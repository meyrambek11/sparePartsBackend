import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { from, Observable } from "rxjs";
import {
  Connection,
  DeleteResult,
  Like,
  Repository,
  Transaction,
  TransactionAlreadyStartedError,
  UpdateResult,
} from "typeorm";
import { CreateSparePartDto } from "../dto/create-spareParts.dto";
import { SearchSparePartDto } from "../dto/search-spareParts.dto";
import { SortSparePartDto } from "../dto/sort-spareParts.dto";
import { UpdateSparePartDto } from "../dto/update-spareParts.dto";
import { SpareParts } from "../entity/spare-parts.entity";
import { SparePartPhotos } from "../entity/spare-parts_photo.entity";
import { SparePartCarRelationship } from "../entity/spare-part_car_relationship.entity";
import { SparePartsCategoryService } from "./spare-part_category.service";

@Injectable()
export class SparePartsService {
  constructor(
    @InjectRepository(SpareParts)
    private sparePartsRepository: Repository<SpareParts>,
    @InjectRepository(SparePartCarRelationship)
    private sparePartCarRelationshipRepository: Repository<SparePartCarRelationship>,
    @InjectRepository(SparePartPhotos)
    private sparePartPhotosRepository: Repository<SparePartPhotos>,
    private readonly sparePartsCategoryService: SparePartsCategoryService,
    private connection: Connection
  ) {}

  async getAll(dto: SearchSparePartDto): Promise<SpareParts[]> {
    const pageSize = dto.pageSize || 10;
    const page = dto.page || 0;
    return await this.sparePartsRepository.find({
      take: pageSize,
      skip: page,
      select: ["id", "name", "article_number", "amount", "price"],
      relations: ["sparePartsCategory"],
    });
  }

  async getAllBySearch(dto: SearchSparePartDto) {
    const pageSize = dto.pageSize || 10;
    const page = dto.page || 0;
    const [result, total] = await this.sparePartsRepository.findAndCount({
      where: { name: Like("%" + dto.name + "%") },
      take: pageSize,
      skip: page,
      select: ["id", "name", "article_number", "amount", "price"],
      relations: ["sparePartsCategory"],
    });
    return {
      data: result,
      count: total,
    };
  }

  async getAllBySorting(dto: SortSparePartDto): Promise<SpareParts[]> {
    return this.sparePartsRepository.find({
      relations: ["sparePartsCategory"],
      select: ["id", "name", "article_number", "amount", "price"],
      order: {
        [dto.sortingElement]: dto.sortingBy,
      },
    });
  }

  async createSparePart(dto: CreateSparePartDto): Promise<SpareParts> {
    const sparePartsCategory = await this.sparePartsCategoryService.getOne(
      dto.sparePartsCategoryId
    );

    const newSparePart = new SpareParts();
    newSparePart.sparePartsCategory = sparePartsCategory;
    newSparePart.company_id = dto.company_id;
    newSparePart.dealer_id = dto.dealer_id;
    newSparePart.user_id = dto.user_id;
    newSparePart.client_id = dto.client_id;
    newSparePart.name = dto.name;
    newSparePart.price = dto.price;
    newSparePart.article_number = dto.article_number;
    newSparePart.amount = dto.amount;
    newSparePart.description = dto.description;
    newSparePart.type = dto.type;

    const sparePart = await this.sparePartsRepository.save(newSparePart);

    for (let i = 0; i < dto.cars.length; i++) {
      const newSparePartCarRelationship = new SparePartCarRelationship();
      newSparePartCarRelationship.spareParts = sparePart;
      newSparePartCarRelationship.car_mark_id = dto.cars[i].car_mark_id;
      newSparePartCarRelationship.car_model_id = dto.cars[i].car_model_id;
      newSparePartCarRelationship.car_generation_id =
        dto.cars[i].car_generation_id;
      await this.sparePartCarRelationshipRepository.save(
        newSparePartCarRelationship
      );
    }

    return sparePart;
  }

  async getOne(id: string): Promise<SpareParts> {
    return await this.sparePartsRepository.findOne(id, {
      relations: [
        "sparePartsCategory",
        "sparePartPhotos",
        "sparePartCarRelationships",
      ],
    });
  }

  async updateSparePart(
    id: string,
    dto: UpdateSparePartDto
  ): Promise<UpdateResult> {
    const sparePartsCategory = await this.sparePartsCategoryService.getOne(
      dto.sparePartsCategoryId
    );
    const sparePart = await this.getOne(id);

    const sparePartCarRelationshipIds = sparePart.sparePartCarRelationships.map(
      (element) => {
        return element.id;
      }
    );
    console.log(sparePartCarRelationshipIds);

    //soft delete car relationship
    await this.sparePartCarRelationshipRepository.softDelete(
      sparePartCarRelationshipIds
    );
    //create car relation
    for (let i = 0; i < dto.cars.length; i++) {
      const newSparePartCarRelationship = new SparePartCarRelationship();
      newSparePartCarRelationship.spareParts = sparePart;
      newSparePartCarRelationship.car_mark_id = dto.cars[i].car_mark_id;
      newSparePartCarRelationship.car_model_id = dto.cars[i].car_model_id;
      newSparePartCarRelationship.car_generation_id =
        dto.cars[i].car_generation_id;
      await this.sparePartCarRelationshipRepository.save(
        newSparePartCarRelationship
      );
    }

    let sparePartData = {
      company_id: dto.company_id,
      dealer_id: dto.dealer_id,
      client_id: dto.client_id,
      user_id: dto.user_id,
      name: dto.name,
      price: dto.price,
      article_number: dto.article_number,
      amount: dto.amount,
      description: dto.description,
      type: dto.type,
      sparePartsCategory: sparePartsCategory,
    };
    const updatedSparePart = await this.sparePartsRepository.update(
      id,
      sparePartData
    );

    return updatedSparePart;
  }

  async destroy(id: string) {
    const sparePart = await this.getOne(id);
    const sparePartCarRelationshipIds = sparePart.sparePartCarRelationships.map(
      (element) => {
        return element.id;
      }
    );
    const sparePartCPhotosIds = sparePart.sparePartPhotos.map((element) => {
      return element.id;
    });
    if (sparePartCarRelationshipIds.length != 0) {
      await this.sparePartCarRelationshipRepository.softDelete(
        sparePartCarRelationshipIds
      );
    }
    if (sparePartCPhotosIds.length != 0) {
      await this.sparePartPhotosRepository.softDelete(sparePartCPhotosIds);
    }
    return await this.sparePartsRepository.softDelete(id);
  }
}
