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

import Costumer from './Costumer';

@Entity('orderservice')
class OrderService {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  sector: string;

  @Column()
  date: string;

  @Column()
  description: string;

  @Column()
  resolution: string;

  @Column()
  status: string;

  @Column()
  costumer_id: string;

  @ManyToOne(() => Costumer, costumer => costumer.orderService, { eager: true })
  @JoinColumn({ name: 'costumer_id' })
  costumer: Costumer;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default OrderService;
