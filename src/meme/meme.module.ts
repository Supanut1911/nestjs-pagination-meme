import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meme } from '../Entity/meme.entity';
import { MemeController } from './meme.controller';
import { MemeService } from './meme.service';
import { MulterModule } from '@nestjs/platform-express'
import { diskStorage, memoryStorage } from 'multer'
@Module({
  imports: [
    TypeOrmModule.forFeature([Meme]),
    MulterModule.register({
      // dest: "src/meme/uploadfile",
      storage: memoryStorage({
        destination: 'src/meme/uploadfile'
      })
    })
  ],
  controllers: [MemeController],
  providers: [MemeService]
})
export class MemeModule {}
