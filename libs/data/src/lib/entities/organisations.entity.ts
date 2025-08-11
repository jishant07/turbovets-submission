import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';
import { Task } from './task.entity';

@Entity({ name: 'organisations' })
export class Organisation extends BaseEntity {
    @Column({ type: 'varchar', nullable: false })
    name: string;

    @ManyToOne(() => Organisation, (organisation) => organisation.children, {
        onDelete: 'SET NULL',
        nullable: true
    })
    @JoinColumn({ name: "parent_id" })
    parent: Organisation;

    @OneToMany(() => Organisation, (organisation) => organisation.parent)
    children: Organisation[];

    @OneToMany(() => User, user => user.organisation)
    users: User[];

    @OneToMany(() => Task, task => task.organisation)
    tasks: Task[]
}
