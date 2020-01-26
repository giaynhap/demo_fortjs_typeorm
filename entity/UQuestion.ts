import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToOne
  } from 'typeorm';

@Entity('questions')
export class UQuestion  {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({length:1024})
  title: string;
  @Column({length:10240})
  description: string;
  @Column({length:1024, nullable:true})
  image: string;
  @Column({ type: 'datetime'})
  createDate: Date;
  @Column()
  status:number
  @Column()
  type: string;
}

