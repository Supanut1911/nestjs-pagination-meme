import { HttpException, Injectable, UseInterceptors, UploadedFile, ForbiddenException  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MemeDto } from '../Dto/memeDto';
import { PaginationDto } from '../Dto/pagination.dto';
import { Meme } from '../Entity/meme.entity';
import * as admin from 'firebase-admin'
import { firestore } from 'firebase-admin';
import { resolve } from 'node:path';
import { rejects } from 'node:assert';
import { FileInterceptor } from '@nestjs/platform-express';
import  { Storage }  from  '@google-cloud/storage'
import * as fs from 'fs'


const storage = new Storage({
    projectId: "e-la-ff65c",
    keyFilename: "e-la-ff65c-firebase-adminsdk-3brl6-29aac8f07d.json"
});
const bucket = storage.bucket("gs://e-la-ff65c.appspot.com")

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

    async uploadfile(
        file,
    ) {
        if(file) {
            this.uploadImageToStorage(file).then((success) => {
                return 'success'
            }).catch((error) => {
                console.error(error)
            })
        }
    }

    private uploadImageToStorage = (file,) => {
        let prom = new Promise((resolve, reject) => {
            if(!file) {
                reject('no image')
            }
            let newFileName = `${file.originalname}_${Date.now()}`
            let fileUpload = bucket.file(newFileName)

            let blobStream = fileUpload.createWriteStream({
                metadata: {
                    contentType: file.mimetype
                }
            })
    
            blobStream.on('error', (error) => {
                reject('Something is wrong! Unable to upload at the moment.');
            })

            blobStream.on('finish', () => {
                const url = `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`
                resolve(url);
            });
          
            blobStream.end(file.buffer);
        })
        return prom
    }

    private async deleteFileupload(filePath) {
        await fs.unlink(filePath, (err) => {
          if(err) {
            throw new ForbiddenException()
          }
        })
      }
}
