import { Column, Entity, BaseEntity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'tasks' })
export class Task extends BaseEntity{

	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column({ type: 'varchar', length: 50 })
	task_description: string;

	@ManyToOne(() => User, user => user.tasks)
	user: User

}
