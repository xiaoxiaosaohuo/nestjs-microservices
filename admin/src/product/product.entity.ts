import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm'

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    image: string;

    @Column({default:0})
    likes: number;

    
}