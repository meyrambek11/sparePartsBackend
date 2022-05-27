import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SpareParts } from "./spare-parts.entity";

@Entity("spare_parts_category")
export class SparePartsCategory {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    nullable: false,
  })
  name: string;

  @OneToMany(() => SpareParts, (spareParts) => spareParts.sparePartsCategory)
  spareParts: SpareParts[];

  @Column({ type: "timestamp", default: () => "NOW()" })
  created_at: Date;

  @Column({ type: "timestamp", default: () => "NOW()", onUpdate: "NOW()" })
  updated_at: Date;

  @DeleteDateColumn({ select: false })
  deleted_at: Date;
}
