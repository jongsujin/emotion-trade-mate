import { Module, Global } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Global() // 전역 모듈
@Module({
  providers: [DatabaseService], // 싱글톤으로 등록
  exports: [DatabaseService], // 다른 모듈에서 사용 가능
})
export class DatabaseModule {}
