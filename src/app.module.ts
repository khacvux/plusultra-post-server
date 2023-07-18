import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { PostModule } from './post/post.module';
import { LikePostModule } from './like-post/like-post.module';
import { CommentPostModule } from './comment-post/comment-post.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    PostModule,
    LikePostModule,
    CommentPostModule,
  ],
})
export class AppModule {}
