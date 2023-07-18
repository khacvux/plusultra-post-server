import { HttpException, HttpStatus } from '@nestjs/common';

export class CommentPostFailException extends HttpException {
  constructor(private error: Error) {
    super(`Comment fail!, \n ${error}`, HttpStatus.BAD_REQUEST);
  }
}
