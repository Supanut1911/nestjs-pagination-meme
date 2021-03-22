import { Body, Controller, Get, Post } from '@nestjs/common';
import { MemeDto } from './Dto/memeDto';
import { MemeService } from './meme.service';

@Controller('meme')
export class MemeController {

    constructor(
        private readonly memeService: MemeService
    ){} 

    @Post('createMeme')
    createMeme(
        @Body() memeDto: MemeDto
    ) {
        return this.memeService.createMeme(memeDto)
    }
}
