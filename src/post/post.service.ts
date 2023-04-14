import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto, DeleteMediaFileDto, UpdatePostDto } from './dto';
import { DeletePostDto } from './dto/delete-post.dto';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreatePostDto) {
    try {
      const postCreated = await this.prisma.post.create({
        data: {
          caption: dto.caption,
          authorId: dto.authorId,
        },
      });

      await Promise.all(
        dto.mediaFiles.map(async (file) => {
          await this.prisma.postMedia.create({
            data: {
              postId: postCreated.id,
              mediaUrl: file.url,
              mediaKey: file.keyFile,
            },
          });
        }),
      );
      return {
        message: 'Post created',
      };
    } catch (error) {
      return error;
    }
  }

  async findAllPostOfUser(userId: number) {
    try {
      const posts = await this.prisma.post.findMany({
        where: {
          authorId: userId,
        },
        select: {
          id: true,
          authorId: true,
          caption: true,
          modifiedAt: true,
          media: {
            select: {
              mediaKey: true,
              mediaUrl: true,
              modifiedAt: true,
            },
          },
        },
      });
      return {
        message: 'success',
        data: posts,
      };
    } catch (error) {
      return error;
    }
  }

  async findOne(id: number) {
    try {
      const posts = await this.prisma.post.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          authorId: true,
          caption: true,
          modifiedAt: true,
          media: {
            select: {
              mediaKey: true,
              mediaUrl: true,
              modifiedAt: true,
            },
          },
        },
      });
      return {
        message: 'success',
        data: posts,
      };
    } catch (error) {
      return error;
    }
  }

  async findCommentsOfPost(postId: number) {
    try {
      return await this.prisma.postComment.findMany({
        where: {
          postId,
        },
        select: {
          comment: true,
          id: true,
          author: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
            },
          },
        },
      });
    } catch (error) {
      return error;
    }
  }

  async updatePostCaption(dto: UpdatePostDto) {
    try {
      await this.prisma.post.update({
        where: {
          id: dto.postId,
        },
        data: {
          caption: dto.caption,
        },
      });
      return {
        message: 'updated',
      };
    } catch (error) {
      return error;
    }
  }

  async deleteMediaFile(dto: DeleteMediaFileDto) {
    try {
      return await this.prisma.postMedia.delete({
        where: {
          mediaKey: dto.fileKey,
        },
      });
    } catch (error) {
      return error;
    }
  }

  async remove(payload: DeletePostDto) {
    try {
      await this.prisma.postMedia.deleteMany({
        where: {
          postId: payload.postId,
        },
      });
      await this.prisma.post.delete({
        where: {
          id: payload.postId,
        },
      });
      return {
        message: 'success',
      };
    } catch (error) {
      throw new Error('error');
    }
  }
}
