import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreatePostDto,
  DeleteMediaFileDto,
  SavePostPhotos,
  UpdatePostDto,
} from './dto';
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
      return {
        message: 'created',
        data: {
          postId: postCreated.id,
        },
      };
    } catch (error) {
      return error;
    }
  }

  async savePostPhotos(dto: SavePostPhotos) {
    try {
      await Promise.all(
        dto.mediaFiles.map(async (file) => {
          await this.prisma.postMedia.create({
            data: {
              postId: dto.postId,
              mediaUrl: file.url,
              mediaKey: file.keyFile,
            },
          });
        }),
      );
      return {
        message: 'updated',
      };
    } catch (error) {
      return error;
    }
  }

  async findAllPostOfUser(payload: {
    userId: number;
    authorId: number;
    pagination: number;
  }) {
    const take = 30;
    const skip = take * (payload.pagination - 1);
    try {
      const posts = await this.prisma.post.findMany({
        where: {
          authorId: payload.authorId,
        },
        orderBy: {
          modifiedAt: 'desc',
        },
        skip,
        take,
        include: {
          _count: {
            select: {
              comment: true,
              likes: true,
            },
          },
          media: {
            select: {
              mediaKey: true,
              mediaUrl: true,
              modifiedAt: true,
            },
          },
          user: {
            select: {
              email: true,
              firstName: true,
              lastName: true,
              avatar: true,
            },
          },
          likes: {
            select: {
              userId: true,
            },
          },
        },
      });

      const result = posts.map((post) => {
        const liked = post.likes.some((like) => {
          if (like.userId == payload.userId) return true;
          return false;
        });
        delete post.likes;
        return {
          ...post,
          liked,
        };
      });
      return {
        message: 'success',
        currentPag: payload.pagination,
        data: result,
      };
    } catch (error) {
      return error;
    }
  }

  async findOne(id: number) {
    try {
      const post = await this.prisma.post.findUnique({
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
        data: post,
      };
    } catch (error) {
      return error;
    }
  }

  async findCommentsOfPost(payload: {
    postId: number;
    userId: number;
    pagination: number;
  }) {
    try {
      const take = 30;
      const skip = take * (payload.pagination - 1);

      const comments = await this.prisma.postComment.findMany({
        where: {
          postId: payload.postId,
        },
        skip,
        take,
        orderBy: {
          createdAt: 'desc',
        },
        select: {
          comment: true,
          id: true,
          createdAt: true,
          author: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
              avatar: true,
            },
          },
          likes: {
            select: {
              userId: true,
            },
          },
          _count: {
            select: {
              likes: true,
            },
          },
        },
      });
      const data = comments.map((comment) => {
        const liked = comment.likes.some((like) => {
          if (like.userId == payload.userId) return true;
          return false;
        });
        delete comment.likes;
        return {
          ...comment,
          liked,
        };
      });

      return {
        message: '',
        currentPag: payload.pagination,
        data,
      };
    } catch (error) {
      throw new BadRequestException(error);
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
