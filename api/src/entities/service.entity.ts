import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class service {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    name: string;

    @Column('text')
    description: string;

    @Column({ default: () => 'CURRENT_TIMESTAMP', type: 'timestamp' })
    created: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated: Date;

    @Column('text')
    login_url: string;
}