import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SpareParts } from "./spare-parts.entity";

@Entity("spare_part_photos")
export class SparePartPhotos {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    nullable: false,
  })
  photo: string;

  @ManyToOne(() => SpareParts, (spareParts) => spareParts.sparePartPhotos)
  @JoinColumn({ name: "spare_parts_id" })
  spareParts: SpareParts;

  @Column({ type: "timestamp", default: () => "NOW()" })
  created_at: Date;

  @Column({ type: "timestamp", default: () => "NOW()", onUpdate: "NOW()" })
  updated_at: Date;

  @DeleteDateColumn({ select: false })
  deleted_at: Date;
}
