import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTodoDto {
  @ApiProperty()
  @IsNotEmpty()
  task: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  description: string;
}