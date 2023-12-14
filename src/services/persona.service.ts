import { Injectable } from "@nestjs/common";
import { Persona } from "src/entities/persona.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Archivo } from "src/entities/archivo.entity";
import { Telefono } from "src/entities/telefono.entity";

@Injectable()
export class PersonaService{
    constructor(
        @InjectRepository(Persona)
        private personaRepository : Repository<Persona>,
        @InjectRepository(Archivo)
        private archivoRepository : Repository<Archivo>,
        @InjectRepository(Telefono)
        private telefonoRepository : Repository<Telefono>,
    ){}

    async guardarDatosPersona(body:any, files:any): Promise<Persona>{
        const persona = this.personaRepository.create({
            nombre: body.nombre,
            apellidoPaterno: body.apellidoPaterno,
            apellidoMaterno: body.apellidoMaterno,
            curp:body.curp,
            juzgado:body.juzgado,
            causaPenal:body.causaPenal
          });

          const savedPersona = await this.personaRepository.save(persona);

          if(files.length > 0){
            const archivos = files.map(filePath => {
                const archivo = new Archivo();
                archivo.archivoPath = filePath.path;
                archivo.tipoDocumento= filePath.fieldname
                archivo.persona = savedPersona;
                return archivo;
                
              });
              await this.archivoRepository.save(archivos);
          }

          if(body.telefono && body.telefono.length > 0){
                const telefonos = JSON.parse(body.telefono);
                const telefonosData = telefonos.map( telefono =>{
                    const tel = new Telefono();
                    tel.telefono = telefono.telefono;
                    tel.tipo = telefono.tipo;
                    tel.persona = savedPersona
                    return tel;
                  });
                  await this.telefonoRepository.save(telefonosData);
            
            
          }
          savedPersona.telefonos = await this.telefonoRepository.find({ where: { persona: savedPersona } });
          savedPersona.archivos = await this.archivoRepository.find({ where: { persona: savedPersona } });

          return savedPersona;
        
    }

}