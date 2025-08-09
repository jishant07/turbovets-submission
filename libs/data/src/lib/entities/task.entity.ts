import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity{

	@Column({ type: 'varchar', length: 50, nullable: false })
	first_name!: string;

	@Column({ type: 'varchar', length: 50, nullable: false })
	last_name!: string;

	@Column({ type: 'varchar', length: 255, unique: false })
	email!: string;

	@Column({ type: 'varchar', length: 255, nullable: false })
	password!: string;

	@Column({ type: 'timestamp with time zone', nullable: false })
	email_verified_at!: Date;

	@Column({ type: 'boolean', default: false })
	is_active!: boolean;
}
