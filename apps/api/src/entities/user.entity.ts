import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity'
import { Organisation } from './organisations.entity';
import { Roles } from './roles.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity {

    @Column({ type: 'varchar', length: 50 })
    email: string;
    
    @Column({ type: 'varchar' })
    userName: string

    @Column({ type: 'varchar' })
    password: string

    @ManyToOne(() => Organisation, {
        eager: true, 
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: 'organisation_id' })
    organisation: Organisation

    @ManyToOne(() => Roles, {
        eager: true, 
        onDelete: 'SET NULL',
        nullable: true
    })
    @JoinColumn({ name: 'role_id' })
    role : Roles
}
