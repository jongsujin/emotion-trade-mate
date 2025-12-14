import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';

/**
 * GET /journals?page=1&limit=10
 */
export class GetJournalsDto {
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  @IsOptional()
  page?: number = 1;

  @Type(() => Number)
  @IsInt()
  @IsPositive()
  @IsOptional()
  limit?: number = 10;
}

/**
 * 일지 생성 시 첫 감정(선택)
 */
export class CreateFirstEmotionDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  price?: number; // 없으면 buyPrice로 서버에서 보정

  @IsOptional()
  @IsString()
  @MaxLength(500)
  memo?: string;

  @IsOptional()
  @IsString({ each: true })
  emotionCodes?: string[]; // 예: ["FEAR", "CONFIDENT"]
}

/**
 * POST /journals
 */
export class CreateJournalDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(10)
  symbol: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  symbolName: string;

  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  buyPrice: number;

  @Type(() => Number)
  @IsInt()
  @IsPositive()
  initialQuantity: number;

  @IsDateString()
  buyDate: string; // YYYY-MM-DD

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateFirstEmotionDto)
  firstEmotion?: CreateFirstEmotionDto;
}

/**
 * PATCH /journals/:id
 * v1에서는 미반영
 */
export class UpdateJournalDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  symbolName?: string;

  @IsOptional()
  @IsEnum(['OPEN', 'CLOSED'])
  status?: 'OPEN' | 'CLOSED';
}

export class CreateJournalResponseDto {
  @IsNotEmpty()
  @IsBoolean()
  success: boolean;
  @IsNotEmpty()
  @IsString()
  message: string;
}
