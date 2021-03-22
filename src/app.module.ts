import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './Config/typeOrm.config';
import { MemeModule } from './meme/meme.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    MemeModule
  ]
})
export class AppModule {}
