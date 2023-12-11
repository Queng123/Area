import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne } from 'typeorm';

@Entity()
export class trigger {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    type: string;

    @Column('text')
    trigger_url: string;

    @Column('text')
    trigger: string;

    @Column('text')
    description: string;

    @Column({ default: () => 'CURRENT_TIMESTAMP', type: 'timestamp' })
    created: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated: Date;
}