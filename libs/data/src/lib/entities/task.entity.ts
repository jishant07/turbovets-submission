import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity'
import { User } from './user.entity';
import { TaskStatus } from '../interfaces';

@Entity({ name: 'tasks' })
export class Task extends BaseEntity {

    @Column({ type: 'varchar', length: 50 })
    name: string;

    @Column({ type: 'varchar', nullable: false })
    description: string

    @Column ({ type: 'enum', enum: TaskStatus, default: TaskStatus.TODO })
    taskStatus: TaskStatus

    @ManyToOne(() => User, user => user.tasks)
    @JoinColumn({ name: "user_id" })
    user: User
}
