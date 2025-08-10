import { BaseEntity as _BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BeforeUpdate } from 'typeorm';

export class BaseEntity extends _BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @BeforeUpdate()
    updateTimestamp() {
        this.updatedAt = new Date();
    }
}
