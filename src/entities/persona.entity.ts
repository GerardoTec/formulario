import {Entity,Column,PrimaryGeneratedColumn, OneToMany} from "typeorm";
import { Archivo } from "./archivo.entity";
import { Telefono } from "./telefono.entity";

@Entity({name:'personas'})
export class Persona{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    nombre:string;

    @Column({ name: 'apellido_paterno', length: 255 })
    apellidoPaterno: string;

    @Column({ name: 'apellido_materno', length: 255, nullable: true })
    apellidoMaterno: string;

    @Column({ length: 18, nullable: true })
    curp: string;

    @Column({ length: 255, nullable: true })
    juzgado: string;

    @Column({ name: 'causa_penal', length: 255, nullable: true })
    causaPenal: string;

    @OneToMany(type => Telefono, telefono => telefono.persona)
    telefonos: Telefono[];
  
    @OneToMany(type => Archivo, archivo => archivo.persona)
    archivos: Archivo[];
}