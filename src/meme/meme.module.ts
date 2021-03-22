import { Module } from '@nestjs/common';
import { MemeController } from './meme.controller';
import { MemeService } from './meme.service';

@Module({
  controllers: [MemeController],
  providers: [MemeService]
})
export class MemeModule {}
