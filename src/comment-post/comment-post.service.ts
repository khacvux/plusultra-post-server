import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateCommentDto,
  DeleteCommentDto,
  GetCommentLikesDto,
  LikeCommentDto,
  UpdateCommentDto,
} from './dto';
import { CommentPostFailException, ServerErrorException } from './exceptions';

@Injectable()
export class CommentPostService {
  constructor(private prisma: PrismaService) {}

  async create(payload: CreateCommentDto) {
    try {
      const result = await this.prisma.postComment.create({
        data: {
          postId: payload.postId,
          authorId: payload.userId,
          comment: payload.comment,
        },
      });
      return {
        message: 'commented',
        data: {
          commentId: result.id,
        },
      };
    } catch (error) {
      throw new CommentPostFailException(error);
    }
  }

  async deleteOne(payload: DeleteCommentDto) {
    try {
      return {
        message: await this.prisma.$queryRawUnsafe(
          `SELECT delete_comment(${payload.commentId}, ${payload.userId})`,
        ),
      };
    } catch {
      try {
        await this.prisma.$queryRawUnsafe(`
          CREATE OR REPLACE FUNCTION delete_comment(_commentId INTEGER, _authorId INTEGER)
          RETURNS text AS $$
          BEGIN
            IF EXISTS (SELECT * FROM post_comment WHERE id=_commentId AND "authorId"=_authorId)
              THEN 
              DELETE FROM post_comment WHERE id=_commentId;
              RETURN 'Record deleted successfully.';
            ELSE
              RETURN 'No record found with the specified commentId and authorId.';
            END IF;
          END 
          $$
          LANGUAGE plpgsql;
        `);
        return {
          message: await this.prisma.$queryRawUnsafe(`
            SELECT delete_comment(${payload.commentId}, ${payload.userId})
          `),
        };
      } catch (error) {
        throw new ServerErrorException(error);
      }
    }
  }

  async update(payload: UpdateCommentDto) {
    try {
      await this.prisma.postComment.updateMany({
        where: {
          id: payload.commentId,
          authorId: payload.userId,
        },
        data: {
          comment: payload.newCommnet,
        },
      });
      return {
        message: 'sucessful',
      };
    } catch (error) {
      throw new ServerErrorException(error);
    }
  }

  async like(payload: LikeCommentDto) {
    try {
      await this.prisma.$queryRawUnsafe(`
        DO $$
        BEGIN
          IF EXISTS ( 
            SELECT * FROM post_comment_likes 
            WHERE "userId"=${payload.userId} 
            AND "commentId"=${payload.commentId})
          THEN 
            DELETE FROM post_comment_likes 
            WHERE "userId"=${payload.userId} 
            AND "commentId"=${payload.commentId};
          ELSE
            INSERT INTO post_comment_likes ("commentId", "userId", "createdAt", "modifiedAt")
            VALUES (${payload.commentId},${payload.userId}, now(), now());
          END IF;
        END $$
      `);
      return {
        message: 'OK',
      };
    } catch (error) {
      throw new ServerErrorException(error);
    }
  }

  async getLikes(payload: GetCommentLikesDto) {
    try {
      const [list, count] = await Promise.all([
        this.prisma.postCommentLike.findMany({
          where: {
            commentId: payload.commentId,
          },
          orderBy: {
            modifiedAt: 'asc',
          },
          select: {
            commentId: true,
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
              },
            },
            createdAt: true,
          },
        }),
        this.prisma.postCommentLike.count({
          where: {
            commentId: payload.commentId,
          },
        }),
      ]);

      return {
        total: count,
        likes: list,
      };
    } catch (error) {
      throw new ServerErrorException(error);
    }
  }
}
