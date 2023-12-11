import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { ForeignKeyMetadata } from 'typeorm/metadata/ForeignKeyMetadata';
import { user } from './user.entity';
import { service } from './service.entity';


@Entity()
export class user_service {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => user)
    user_id: ForeignKeyMetadata;

    @OneToOne(type => service)
    service_id: ForeignKeyMetadata;

    @Column('text')
    token: string;

    @Column({ default: () => 'CURRENT_TIMESTAMP', type: 'timestamp' })
    created: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated: Date;
}