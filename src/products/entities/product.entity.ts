import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Product {

    @PrimaryGeneratedColumn('uuid')
    id: string;


    @Column('text', {
        unique: true, //No pueden haber dos productos con el mismo nombre
    })
    title: string

    @Column('float', {
        default: 0
    })
    price: number

    @Column({
        type: "text",
        nullable: true //Puede aceptar nulos
    })
    description: string

    @Column({
        type: "text",
        unique: true
    })
    slug: string

    @Column({
        type: "int",
        default: 0
    })
    stock: number

    @Column({
        type: "text",
        array: true
    })
    sizes: string[]

    @Column({
        type: "text"
    })
    gender: string


    @Column({
        type: "text",
        array: true,
        default: []
    })
    tags: string[];


    @BeforeInsert()
    checkSlugInsert() {
        if (!this.slug) {
            this.slug = this.title
        }

        this.slug = this.slug
            .toLowerCase()
            .replaceAll(" ", "_")
            .replaceAll("'", "")
    }

    @BeforeUpdate()
    checkSlugUpdate() {
        this.slug = this.slug
            .toLowerCase()
            .replaceAll(" ", "_")
            .replaceAll("'", "")
    }
}
