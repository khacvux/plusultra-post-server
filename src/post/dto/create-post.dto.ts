import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import IMedia from '../types/media.type';


export class CreatePostDto {
  @IsOptional()
  @IsString()
  caption: string;

  @IsNotEmpty()
  authorId: number;

  @IsOptional()
  mediaFiles: IMedia[];

}
