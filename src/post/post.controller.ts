import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PostService } from './post.service';
import {
  CreatePostDto,
  DeleteMediaFileDto,
  SavePostPhotos,
  UpdatePostDto,
} from './dto';
import { DeletePostDto } from './dto/delete-post.dto';

@Controller()
export class PostController {
  constructor(private readonly postService: PostService) {}

  @MessagePattern('create_post')
  create(@Payload() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @MessagePattern('save_post_photos')
  savePostPhotos(@Payload() savePostPhotosDto: SavePostPhotos) {
    return this.postService.savePostPhotos(savePostPhotosDto);
  }

  @MessagePattern('all_post_of_user')
  findAll(
    @Payload()
    payload: {
      userId: number;
      authorId: number;
      pagination: number;
    },
  ) {
    return this.postService.findAllPostOfUser(payload);
  }

  @MessagePattern('find_post')
  findOne(@Payload() id: number) {
    return this.postService.findOne(id);
  }

  @MessagePattern('post_comments')
  postComments(
    @Payload() payload: { postId: number; userId: number; pagination: number },
  ) {
    return this.postService.findCommentsOfPost(payload);
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
