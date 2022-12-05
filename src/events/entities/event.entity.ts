import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

// @Index(['name', 'type']) // composed indexes (multiple columns)
@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column()
  name: string;

  @Column()
  type: string;

  @Column('json')
  payload: Record<string, any>;
}
