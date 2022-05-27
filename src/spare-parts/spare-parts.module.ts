import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SparePartsController } from "./controllers/spare-part.controller";
import { SparePartsCategoryController } from "./controllers/spare-part_category.controller";
import { SparePartsPhotosController } from "./controllers/spare-part_photos.controller";
import { SpareParts } from "./entity/spare-parts.entity";
import { SparePartsCategory } from "./entity/spare-parts_category.entity";
import { SparePartPhotos } from "./entity/spare-parts_photo.entity";
import { SparePartCarRelationship } from "./entity/spare-part_car_relationship.entity";
import { SparePartsService } from "./services/spare-part.service";
import { SparePartsCategoryService } from "./services/spare-part_category.service";
import { SparePartsPhotosService } from "./services/spare-part_photos.service";

@Module({
  controllers: [
    SparePartsController,
    SparePartsCategoryController,
    SparePartsPhotosController,
  ],
  providers: [
    SparePartsService,
    SparePartsCategoryService,
    SparePartsPhotosService,
  ],
  imports: [
    TypeOrmModule.forFeature([
      SpareParts,
      SparePartsCategory,
      SparePartCarRelationship,
      SparePartPhotos,
    ]),
  ],
})
export class SparePartsModule {}
