import { Type } from "class-transformer";
import { IsInt, isInt, IsOptional, Max, Min } from "class-validator";




export class PaginationQueryDto{

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message : 'Page must be integers'})
  @Min(1,{ message : 'Page must be at least 1'})
  page?: number = 1

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message : 'Limit must be integers'})
  @Min(1,{ message : 'Limit must be at least 1'})
  @Max(100,{ message : 'Limit cant exceed 100'})
  limit?: number = 10
}