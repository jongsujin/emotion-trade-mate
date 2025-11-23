import { Type } from 'class-transformer';
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';

export class GetJournalsDto {
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  page: number;

  @Type(() => Number)
  @IsInt()
  @IsPositive()
  limit: number;
}

export class CreateJournalDto {
  @IsNotEmpty()
  symbol: string;

  @IsNotEmpty()
  symbolName: string;

  @IsNumber()
  @IsPositive()
  buyPrice: number;

  @IsInt()
  @IsPositive()
  initialQuantity: number;

  @IsDateString()
  buyDate: string;

  @IsInt()
  @IsPositive()
  totalQuantity: number;

  @IsOptional()
  memo?: string;
}

export class UpdateJournalDto {
  @IsOptional()
  buyPrice?: number;

  @IsOptional()
  quantity?: number;

  @IsOptional()
  emotionId?: number;

  @IsOptional()
  memo?: string;
}
