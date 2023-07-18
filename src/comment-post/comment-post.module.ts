import { Module } from '@nestjs/common';
import { CommentPostService } from './comment-post.service';
import { CommentPostController } from './comment-post.controller';

@Module({
  controllers: [CommentPostController],
  providers: [CommentPostService]
})
export class CommentPostModule {}
