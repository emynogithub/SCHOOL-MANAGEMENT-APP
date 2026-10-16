import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/utils/dto/pagination.dto';

export class QueryClassDto extends PaginationDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  name?: string;
}
