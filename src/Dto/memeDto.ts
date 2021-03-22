import { IsString } from "class-validator"

export class MemeDto {
    @IsString()
    name: string

    @IsString()
    meaning: string

    @IsString()
    meme_img: string
}