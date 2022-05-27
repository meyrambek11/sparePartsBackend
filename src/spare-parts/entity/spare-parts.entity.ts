import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SparePartsCategory } from "./spare-parts_category.entity";
import { SparePartPhotos } from "./spare-parts_photo.entity";
import { SparePartCarRelationship } from "./spare-part_car_relationship.entity";

export enum SparePartType {
  NEW = "new",
  USED = "used",
}

@Entity("spare_parts")
export class SpareParts {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  company_id: string;

  @Column({ nullable: false })
  dealer_id: string;

  @Column({ nullable: true })
  client_id: string;

  @Column({ nullable: false })
  user_id: string;

  @ManyToOne(
    () => SparePartsCategory,
    (sparePartsCategory) => sparePartsCategory.spareParts,
    {
      nullable: false,
    }
  )
  sparePartsCategory: SparePartsCategory;

  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    nullable: false,
  })
  price: number;

  @Column({
    nullable: false,
  })
  article_number: number;

  @Column({ nullable: false })
  amount: number;

  @Column()
  description: string;

  @Column({
    type: "enum",
    enum: SparePartType,
    default: SparePartType.NEW,
    nullable: false,
  })
  type: SparePartType;

  @OneToMany(
    () => SparePartCarRelationship,
    (sparePartCarRelationships) => sparePartCarRelationships.spareParts,
    {
      cascade: ["soft-remove"],
    }
  )
  sparePartCarRelationships: SparePartCarRelationship[];

  @OneToMany(
    () => SparePartPhotos,
    (sparePartPhotos) => sparePartPhotos.spareParts,
    {
      cascade: ["soft-remove"],
    }
  )
  sparePartPhotos: SparePartPhotos[];

  @Column({ type: "timestamp", default: () => "NOW()" })
  created_at: Date;

  @Column({ type: "timestamp", default: () => "NOW()", onUpdate: "NOW()" })
  updated_at: Date;

  @DeleteDateColumn({ select: false })
  deleted_at: Date;
  sparePartPhotoRelationships: any;
}
