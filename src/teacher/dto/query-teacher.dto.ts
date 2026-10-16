import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/utils/dto/pagination.dto';

export class QueryTeacherDto extends PaginationDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  subject?: string;

  @IsOptional()
  @IsString()
  username?: string;
}
