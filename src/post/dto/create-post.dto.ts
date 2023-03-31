import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @IsOptional()
  @IsString()
  caption: string;

  @IsOptional()
  @IsString()
  media: string;

  @IsNotEmpty()
  authorId: number;
}
