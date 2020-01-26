import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToOne,
    PrimaryColumn
  } from 'typeorm';

@Entity('options')
export class PageOptions  {
  @PrimaryColumn()
  code: string;
  @Column({length:1024, nullable: true })
  value: string;
  @Column({length:1024, nullable: true })
  comment: string;
}

