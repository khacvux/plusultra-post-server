import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}
  async create(dto: CreatePostDto) {
    console.log(dto);
    const postCreated = await this.prisma.post.create({
      data: {
        caption: dto.caption,
        authorId: dto.authorId,
      },
    });


    const postMedia = await this.prisma.postMedia.create({
      data: {
        postId: postCreated.id,
        mediaUrl: dto.media.mediaUrl,
        mediaKey: dto.media.keyFile,
      },
    });

    // return { postCreated, postMedia };
    return 0;
  }

  findAll() {
    return `This action returns all post`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
