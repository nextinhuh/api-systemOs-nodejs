/* eslint-disable camelcase */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';

import Employee from './Employee';
import Costumer from './Costumer';
import User from './User';
import OrderService from './OrderService';

@Entity('persons')
class Persons {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @OneToOne(() => Costumer, costumer => costumer.person, { eager: true })
  costumer: Costumer;

  @OneToOne(() => Employee, employee => employee.person, { eager: true })
  employee: Employee;

  @OneToOne(() => User, user => user.person, { eager: true })
  user: User;

  @OneToMany(() => OrderService, orderService => orderService.person)
  orderService: OrderService;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Persons;
