import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class MovieTitleVlidationPipe implements PipeTransform<string, string> {
  transform(value: any): string {
    if (!value) {
      return value;
    }

    const valLength = value.length;

    if (valLength <= 2) {
      throw new BadRequestException('영화의 제목은 3자 이상 작성해주세요.');
    }

    return value;
  }
}
