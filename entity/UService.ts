import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToOne
  } from 'typeorm';

@Entity('service')
export class UService  {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  code: string;
  @Column()
  name: string;
  @Column()
  url: string;
  @Column()
  icon: string;

}

