import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CommentPostService } from './comment-post.service';
import * as DTO from './dto';

@Controller()
export class CommentPostController {
  constructor(private readonly commentPostService: CommentPostService) {}

  @MessagePattern('create_comment')
  commentPost(@Payload() dto: DTO.CreateCommentDto) {
    return this.commentPostService.create(dto);
  }

  @MessagePattern('delete_comment')
  deleteComment(@Payload() dto: DTO.DeleteCommentDto) {
    return this.commentPostService.deleteOne(dto);
  }

  @MessagePattern('update_comment')
  updateComment(@Payload() dto: DTO.UpdateCommentDto) {
    return this.commentPostService.update(dto);
  }

  @MessagePattern('like_comment')
  likeComment(@Payload() dto: DTO.LikeCommentDto) {
    return this.commentPostService.like(dto);
  }

  @MessagePattern('get_comment_likes')
  commentLikes(@Payload() dto: DTO.GetCommentLikesDto) {
    return this.commentPostService.getLikes(dto);
  }
}
