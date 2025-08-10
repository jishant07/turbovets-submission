import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity'
import { User } from './user.entity';

@Entity({ name: 'tasks' })
export class Task extends BaseEntity {

    @Column({ type: 'varchar', length: 50 })
    name: string;

    @OneToMany(() => User, user => user.tasks)
    user: User
}
