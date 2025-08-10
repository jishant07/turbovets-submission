import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity'

@Entity({ name: 'tasks' })
export class Task extends BaseEntity {

    @Column({ type: 'varchar', length: 50 })
    name: string;

    // @OneToMany(() => Task, task => task.user)
    // tasks: Task[]
}
