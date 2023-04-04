import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class DeleteMediaFileDto {
  @IsNotEmpty()
  @IsString()
  fileKey: string;
}
