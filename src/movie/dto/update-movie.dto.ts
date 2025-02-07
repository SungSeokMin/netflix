import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateMovieDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  genre?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  detail?: string;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  directorId: number;
}
