import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LikePostService } from './like-post.service';
import { LikePostDto } from './dto';


@Controller()
export class LikePostController {
  constructor(private readonly likePostService: LikePostService) {}
  @MessagePattern('like_post')
  likePost(@Payload() dto: LikePostDto) {
    return this.likePostService.like(dto);
  }
}
