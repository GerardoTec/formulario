import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Persona } from './persona.entity';

@Entity({name:'telefonos'})
export class Telefono {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  telefono: string;

  @Column({ name: 'personaId' })
  personaId: number;

  @Column()
  tipo: string;

  @ManyToOne(() => Persona, persona => persona.telefonos)
  persona: Persona;
}