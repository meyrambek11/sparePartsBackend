import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SpareParts } from "./spare-parts.entity";

@Entity("spare_part_car_relationships")
export class SparePartCarRelationship {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  car_mark_id: string;

  @Column({ nullable: true })
  car_model_id: string;

  @Column({ nullable: true })
  car_generation_id: string;

  @ManyToOne(
    () => SpareParts,
    (spareParts) => spareParts.sparePartCarRelationships
  )
  spareParts: SpareParts;

  @Column({ type: "timestamp", default: () => "NOW()" })
  created_at: Date;

  @Column({ type: "timestamp", default: () => "NOW()", onUpdate: "NOW()" })
  updated_at: Date;

  @DeleteDateColumn({ select: false })
  deleted_at: Date;
}
