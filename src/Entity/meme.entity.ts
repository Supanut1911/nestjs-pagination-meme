import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Meme extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: number

    @Column()
    name: string

    @Column()
    meaning: string

    @Column({
        nullable: true
    })
    meme_img: string
}