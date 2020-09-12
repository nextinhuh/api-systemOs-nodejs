/* eslint-disable camelcase */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Person from './Person';

@Entity('orderservice')
class OrderService {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  sector: string;

  @Column()
  date: Date;

  @Column()
  description: string;

  @Column()
  resolution: string;

  @Column()
  status: string;

  @Column()
  person_id: string;

  @ManyToOne(() => Person, person => person.orderService, { eager: true })
  @JoinColumn({ name: 'person_id' })
  person: Person;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default OrderService;
