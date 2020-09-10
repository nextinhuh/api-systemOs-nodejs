/* eslint-disable camelcase */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import Person from './Person';
import OrderService from './OrderService';

@Entity('costumers')
class Costumer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  sector: string;

  @Column()
  person_id: string;

  @OneToOne(() => Person, person => person.costumer)
  @JoinColumn({ name: 'person_id' })
  person: Person;

  @OneToMany(() => OrderService, orderService => orderService.costumer)
  orderService: OrderService;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Costumer;
