import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { BaseEntity } from './base.entity'

@Entity({ name: 'tasks' })
export class Task extends BaseEntity {

	@Column({ type: 'varchar', length: 50 })
	task_description: string;

	@ManyToOne(() => User, user => user.tasks)
	user: User

}
