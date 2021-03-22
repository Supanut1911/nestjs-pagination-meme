import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MemeDto } from '../Dto/memeDto';
import { PaginationDto } from '../Dto/pagination.dto';
import { Meme } from '../Entity/meme.entity';

@Injectable()
export class MemeService {
    constructor(
        @InjectRepository(Meme)
        private readonly memeRepo: Repository<Meme>,
    ) {}

    async getAllMemes(
        paginationDto
    ): Promise<Object> {
        let { take, skip, page } = paginationDto
        let totalCount = await this.memeRepo.createQueryBuilder('meme')
        .select('*')
        .getCount()

        let memes = await this.memeRepo.createQueryBuilder('meme')
        .select('*')
        .offset(skip)
        .limit(take)
        .getRawMany()
        return {
            data: memes,
            total: totalCount,
            pageTotal: Math.ceil( totalCount / take),
            pageCurrent: page
        }
    }

    async createMeme(
        memeDto: MemeDto
    ) {
        let {name, meaning, meme_img} = memeDto
        let meme = this.memeRepo.create()
        meme.name = name
        meme.meaning = meaning
        meme.meme_img = meme_img

        try {
            await this.memeRepo.save(meme)
            return {
                message: "create meme success"
            }
        } catch (error) {
            throw new HttpException('create meme fail', 400)
        }
    }
}
