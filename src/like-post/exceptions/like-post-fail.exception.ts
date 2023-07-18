import { HttpException, HttpStatus } from '@nestjs/common';

export class LikePostFailException extends HttpException {
  constructor() {
    super('Like fail!', HttpStatus.BAD_REQUEST);
  }
}
