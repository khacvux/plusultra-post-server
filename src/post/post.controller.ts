import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PostService } from './post.service';
import { CreatePostDto, DeleteMediaFileDto, UpdatePostDto } from './dto';
import { DeletePostDto } from './dto/delete-post.dto';


@Controller()
export class PostController {
  constructor(private readonly postService: PostService) {}

  @MessagePattern('create_post')
  create(@Payload() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @MessagePattern('all_post_of_user')
  findAll(@Payload() userId: number) {
    return this.postService.findAllPostOfUser(userId);
  }

  @MessagePattern('find_post')
  findOne(@Payload() id: number) {
    return this.postService.findOne(id);
  }

  @MessagePattern('update_post_caption')
  update(@Payload() updatePostDto: UpdatePostDto) {
    return this.postService.updatePostCaption(updatePostDto);
  }

  @MessagePattern('delete_media_file')
  deleteMediaFile(@Payload() dto: DeleteMediaFileDto) {
    return this.postService.deleteMediaFile(dto);
  }

  @MessagePattern('delete_post')
  remove(@Payload() dto: DeletePostDto) {
    return this.postService.remove(dto);
  }
}
