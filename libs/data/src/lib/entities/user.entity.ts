import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Organisation } from './organisations.entity';
import { Roles } from './roles.entity';
import { Task } from './task.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity {
    
    @Column({ type: 'varchar', length: 50 })
    email: string;
    
    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'varchar', select: false })
    password: string;

    @ManyToOne(() => Organisation, organisation => organisation.users,{
        onDelete: 'CASCADE',
        nullable: true,
        eager: true
    })
    @JoinColumn({ name: 'organisation_id' })
    organisation: Organisation;

    @ManyToOne(() => Roles, {
        eager: true,
        onDelete: 'SET NULL',
        nullable: true
    })
    @JoinColumn({ name: 'role_id' })
    role: Roles;

    @ManyToOne(() => Task, task => task.user)
    tasks: Task[]
}
