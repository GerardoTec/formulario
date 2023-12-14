import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Persona } from './persona.entity';

@Entity({name:'archivos'})
export class Archivo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'persona_id' })
  personaId: number;

  @Column({ name: 'archivo_path', length: 255 })
  archivoPath: string;

  @Column({ name: 'tipoDocumento', length: 30, default:"" })
  tipoDocumento: string;

  @ManyToOne(() => Persona, persona => persona.archivos)
  @JoinColumn({ name: 'persona_id' })
  persona: Persona;
}