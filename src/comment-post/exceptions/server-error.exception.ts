import { HttpException, HttpStatus } from '@nestjs/common';

export class ServerErrorException extends HttpException {
  constructor(private error: Error) {
    super(`Server error., \n ${error}`, HttpStatus.BAD_REQUEST);
  }
}
