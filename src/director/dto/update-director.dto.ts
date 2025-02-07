import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateDirectorDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @IsDateString()
  @IsNotEmpty()
  @IsOptional()
  dob: Date;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  nationality: string;
}
