import { IsArray, IsInt, IsOptional, IsString } from 'class-validator';

export class CursorPaginationDto {
  @IsString()
  @IsOptional()
  cursor?: string; // id_52,likeCount_20

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  order?: string[] = ['id_DESC']; // ["likeCount_DESC", "id_DESC"]

  @IsInt()
  @IsOptional()
  take: number = 5;
}
