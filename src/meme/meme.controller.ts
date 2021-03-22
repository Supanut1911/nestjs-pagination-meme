import { Body, Controller, Get, Post } from '@nestjs/common';
import { MemeDto } from '../Dto/memeDto';
import { PaginationDto } from '../Dto/pagination.dto';
import { MemeService } from './meme.service';
import { PageParam } from '../Decorator/pagination.decorator'

@Controller('meme')
export class MemeController {

    constructor(
        private readonly memeService: MemeService
    ){} 

    @Get('get_all_meme')
    getAllMeme(
        @PageParam() paginationDto: PaginationDto
    ) {
        return this.memeService.getAllMemes(paginationDto)
    }

    @Post('create_meme')
    createMeme(
        @Body() memeDto: MemeDto
    ) {
        return this.memeService.createMeme(memeDto)
    }

    
}
