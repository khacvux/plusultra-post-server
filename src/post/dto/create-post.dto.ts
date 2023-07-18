import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
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

export class SavePostPhotos {
  @IsNotEmpty()
  @IsNumber()
  postId: number;

  @IsNotEmpty()
  mediaFiles: IMedia[];
}
