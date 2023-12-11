import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class user {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    username: string;

    @Column('text')
    email: string;
    unique: true;

    @Column('text')
    password: string;

    @Column({ default: () => 'CURRENT_TIMESTAMP', type: 'timestamp' })
    created: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated: Date;
}
