import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { user } from './user.entity';
import { action } from './action.entity';
import { reaction } from './reaction.entity';


@Entity()
export class area {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => user)
    user_id: user;

    @OneToOne(type => action)
    action_id: action;

    @OneToOne(type => reaction)
    reaction_id: reaction;

    @Column({ default: () => 'CURRENT_TIMESTAMP', type: 'timestamp' })
    created: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated: Date;
}