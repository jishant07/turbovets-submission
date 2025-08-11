import { BaseEntity as _BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BeforeUpdate } from 'typeorm';

export class BaseEntity extends _BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', select: false })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', select: false })
    updatedAt: Date;

    @BeforeUpdate()
    updateTimestamp() {
        this.updatedAt = new Date();
    }
}
