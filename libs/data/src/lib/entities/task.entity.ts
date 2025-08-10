import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity'
import { User } from './user.entity';

@Entity({ name: 'tasks' })
export class Task extends BaseEntity {

    @Column({ type: 'varchar', length: 50 })
    name: string;

    @ManyToOne(() => User, user => user.tasks)
    @JoinColumn({ name: "user_id" })
    user: User
}
