import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';


export class UpdatePostDto  {
  @IsString()
  @IsNotEmpty()
  caption: string;

  @IsNotEmpty()
  @IsNumber()
  postId: number
}
