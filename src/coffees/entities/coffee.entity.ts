import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity() // no argument generates table called coffee
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  @Column('json', { nullable: true })
  flavors: string[];
}
