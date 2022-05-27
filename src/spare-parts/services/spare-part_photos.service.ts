import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { S3 } from "aws-sdk";
import { uuid } from "uuidv4";
import {
  Connection,
  Repository,
  Transaction,
  TransactionAlreadyStartedError,
} from "typeorm";
import { SpareParts } from "../entity/spare-parts.entity";
import { SparePartPhotos } from "../entity/spare-parts_photo.entity";
import { SparePartsService } from "./spare-part.service";
import { MimeType } from "aws-sdk/clients/kendra";

const FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

@Injectable()
export class SparePartsPhotosService {
  constructor(
    @InjectRepository(SparePartPhotos)
    private sparePartPhotosRepository: Repository<SparePartPhotos>,
    private readonly sparePartsService: SparePartsService,
    private connection: Connection
  ) {}

  // async uploadPhoto(id: string, photo: string): Promise<SpareParts> {
  //   const sparePart = await this.sparePartsService.getOne(id);
  //   let newSparePartPhoto = {
  //     spareParts: sparePart,
  //     photo: photo,
  //   };
  //   await this.sparePartPhotosRepository.save(newSparePartPhoto);
  //   return await this.sparePartsService.getOne(id);
  // }

  async uploadPhotoS3(fileBuffer: Buffer, fileMimetype: MimeType, id: string) {
    const sparePart = await this.sparePartsService.getOne(id);

    const s3 = new S3();
    const extension: string = FILE_TYPE_MAP[fileMimetype];
    const result = await s3
      .upload({
        Bucket: process.env.BUCKET_NAME,
        Body: fileBuffer,
        Key: `part_photos/${uuid()}.${extension}`,
      })
      .promise();
    let newSparePartPhoto = {
      spareParts: sparePart,
      photo: result.Location,
    };
    const sparePartPhoto = await this.sparePartPhotosRepository.save(
      newSparePartPhoto
    );
    return { photo: sparePartPhoto.photo };
  }

  async updatePhotoS3(fileBuffer: Buffer, fileMimetype: MimeType, id: string) {
    const s3 = new S3();
    const extension: string = FILE_TYPE_MAP[fileMimetype];
    const result = await s3
      .upload({
        Bucket: process.env.BUCKET_NAME,
        Body: fileBuffer,
        Key: `part_photos/${uuid()}.${extension}`,
      })
      .promise();
    let newSparePartPhoto = {
      photo: result.Location,
    };
    const updatedSparePartPhoto = await this.sparePartPhotosRepository.update(
      id,
      newSparePartPhoto
    );
    return updatedSparePartPhoto;
  }
}
