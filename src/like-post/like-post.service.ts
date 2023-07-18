import { Injectable } from '@nestjs/common';
import { LikePostDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { LikePostFailException } from './exceptions';

@Injectable()
export class LikePostService {
  constructor(private prisma: PrismaService) {}

  async like(payload: LikePostDto) {
    try {
      const existed = await this.prisma.postLike.findFirst({
        where: {
          postId: payload.postId,
          userId: payload.userId,
        },
      });
      if (existed) {
        return await this._updateLike(existed.id, !existed.status);
      } else {
        const result = await this.prisma.postLike.create({
          data: {
            userId: payload.userId,
            postId: payload.postId,
            status: true,
          },
        });
        return {
          message: 'liked',
          data: {
            likeId: result.id,
          },
        };
      }
    } catch (error) {
      throw new LikePostFailException();
    }
  }

  async _updateLike(likeId: number, like: boolean) {
    const result = await this.prisma.postLike.update({
      where: {
        id: likeId,
      },
      data: {
        status: like,
      },
      select: {
        id: true,
      },
    });
    return {
      message: like ? 'liked' : 'unliked',
      data: {
        likeId: result.id,
      },
    };
  }
}
