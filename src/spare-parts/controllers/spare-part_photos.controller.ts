import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import path, { join } from "path";
import { Observable, of } from "rxjs";
import { diskStorage } from "multer";
import { SparePartPhotos } from "../entity/spare-parts_photo.entity";
import { SparePartsPhotosService } from "../services/spare-part_photos.service";
import { SpareParts } from "../entity/spare-parts.entity";

// const FILE_TYPE_MAP = {
//   "image/png": "png",
//   "image/jpeg": "jpeg",
//   "image/jpg": "jpg",
// };

// export const storage = {
//   storage: diskStorage({
//     destination: "./uploads/sparePartPhoto",
//     filename: (req, file, cb) => {
//       const fileName: string = file.originalname.split(" ").join("-");
//       const extension: string = FILE_TYPE_MAP[file.mimetype];

//       cb(null, `${fileName}-${Date.now()}.${extension}`);
//     },
//   }),
// };

@Controller("spare_parts")
export class SparePartsPhotosController {
  constructor(
    private readonly sparePartsPhotosService: SparePartsPhotosService
  ) {}

  //add sparePart Photos
  // @Post("/upload/:id")
  // @UseInterceptors(FileInterceptor("file", storage))
  // uploadFile(
  //   @UploadedFile() file,
  //   @Param("id", ParseUUIDPipe) id: string,
  //   @Req() req
  // ): Promise<SpareParts> {
  //   const basePath = `${req.protocol}://${req.get("host")}/spare_parts/photos/`;
  //   return this.sparePartsPhotosService.uploadPhoto(
  //     id,
  //     `${basePath}${file.filename}`
  //   );
  // }

  @Put("/upload/:id")
  @UseInterceptors(FileInterceptor("file"))
  uploadPhoto(
    @UploadedFile() file,
    @Body() body,
    @Param("id", ParseUUIDPipe) id: string
  ) {
    console.log("Request to upload file to S3");
    console.log(file);
    console.log(body);
    return this.sparePartsPhotosService.uploadPhotoS3(
      file.buffer,
      file.mimetype,
      id
    );
  }

  @Patch("/update/:id")
  @UseInterceptors(FileInterceptor("file"))
  updatePhoto(
    @UploadedFile() file,
    @Body() body,
    @Param("id", ParseUUIDPipe) id: string
  ) {
    console.log("Request to upload file to S3");
    console.log(file);
    console.log(body);
    return this.sparePartsPhotosService.updatePhotoS3(
      file.buffer,
      file.mimetype,
      id
    );
  }

  // @Get("photos/:photoname")
  // findProfileImage(
  //   @Param("photoname") photoname,
  //   @Res() res
  // ): Observable<Object> {
  //   return of(
  //     res.sendFile(join(process.cwd(), "uploads/sparePartPhoto/" + photoname))
  //   );
  // }
}
