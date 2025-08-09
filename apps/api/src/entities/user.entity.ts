import { Column, Entity, BaseEntity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Task } from './task.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'varchar', length: 50 })
    email: string;

    @Column({ type: 'varchar' })
    first_name: string

    @OneToMany(() => Task, task => task.user)
    tasks: Task[]
    
}
