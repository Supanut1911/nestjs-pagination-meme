import { Body, Controller, Get, Post } from '@nestjs/common';
import { MemeDto } from '../Dto/memeDto';
import { MemeService } from './meme.service';

@Controller('meme')
export class MemeController {

    constructor(
        private readonly memeService: MemeService
    ){} 

    @Get('get_all_meme')
    getAllMeme() {
        return this.memeService.getAllMemes()
    }

    @Post('create_meme')
    createMeme(
        @Body() memeDto: MemeDto
    ) {
        return this.memeService.createMeme(memeDto)
    }
}
