import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm'
import { PersonaService } from './services/persona.service';
import { Persona } from './entities/persona.entity';
import { PersonaController } from './controllers/persona.controller';
import { Archivo } from './entities/archivo.entity';
import { Telefono } from './entities/telefono.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'G3r4rd0#',
      database: 'bd_auxiliar',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Persona,Archivo,Telefono])
  ],
  controllers: [PersonaController, AppController],
  providers: [PersonaService, AppService],
})
export class AppModule {}
