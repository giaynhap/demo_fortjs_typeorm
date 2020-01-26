import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToOne
  } from 'typeorm';

@Entity('sliders')
export class USlider  {
  @PrimaryGeneratedColumn()
  id: number;
  @Column( { length: 1024 })
  image: string;
  @Column()
  title: string;
  @Column()
  detail: string;
}

