import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meme } from '../Entity/meme.entity';
import { MemeController } from './meme.controller';
import { MemeService } from './meme.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Meme])
  ],
  controllers: [MemeController],
  providers: [MemeService]
})
export class MemeModule {}
