import { Body, Controller, Get, Post } from '@nestjs/common';
import { MemeDto } from './Dto/memeDto';

@Controller('meme')
export class MemeController {

    @Post('createMeme')
    createMeme(
        @Body() memeDto: MemeDto
    ) {

        return

    }
}
