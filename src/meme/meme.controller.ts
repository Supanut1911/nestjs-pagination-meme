import { Body, Controller, Get, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { MemeDto } from '../Dto/memeDto';
import { PaginationDto } from '../Dto/pagination.dto';
import { MemeService } from './meme.service';
import { PageParam } from '../Decorator/pagination.decorator'
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from 'firebase-admin';

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

    @UseInterceptors(FileInterceptor( 'file', ))
    @Post('uploadfile')
    uploadfile(
        @UploadedFile() file
    ) {
        console.log("🚀 ~ file: meme.controller.ts ~ line 34 ~ MemeController ~ file", file)
        return this.memeService.uploadfile(file)
    }

}
