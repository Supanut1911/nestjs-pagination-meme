import { Injectable } from '@nestjs/common';
import { MemeDto } from './Dto/memeDto';

@Injectable()
export class MemeService {
    constructor() {}

    async createMeme(
        memeDto: MemeDto
    ) {
        console.log("🚀 ~ file: meme.service.ts ~ line 11 ~ MemeService ~ memeDto", memeDto)
    }
}
