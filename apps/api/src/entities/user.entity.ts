import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity'

@Entity({ name: 'users' })
export class User extends BaseEntity {

    @Column({ type: 'varchar', length: 50 })
    email: string;
    
    @Column({ type: 'varchar' })
    userName: string

    @Column({ type: 'varchar' })
    password: string

    // @OneToMany(() => Task, task => task.user)
    // tasks: Task[]
}
