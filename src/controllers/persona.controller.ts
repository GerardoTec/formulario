import {Controller,Post,Body,UploadedFiles,UseInterceptors, BadRequestException} from '@nestjs/common';
import { Persona } from 'src/entities/persona.entity';
import { PersonaService } from '../services/persona.service';
import {AnyFilesInterceptor} from '@nestjs/platform-express';
import { multerOptions } from '../middlewares/archivo.middleware';
import * as fs from 'fs';
import * as path from 'path';

const directorioUploads = path.resolve(__dirname, '../uploads');
console.log(__dirname)
@Controller('personas')
export class PersonaController{
 constructor(private personaService: PersonaService){}

 @Post('guardar')
 @UseInterceptors(AnyFilesInterceptor(multerOptions))

 async guardarDatosPersona(@Body() persona: any, @UploadedFiles() files: Array<Express.Multer.File> ){
 try {
      if(!fs.existsSync(directorioUploads)){
         fs.mkdirSync(directorioUploads,{recursive:true});
      }
    
         return this.personaService.guardarDatosPersona(persona,files);
      
   } catch (error) {
        if (error instanceof BadRequestException) {
         throw error; 
       } else {
         throw new BadRequestException('Error al procesar la solicitud.');
       }
   }
   
 }
}