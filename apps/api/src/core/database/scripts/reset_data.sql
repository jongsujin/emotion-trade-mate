-- 모든 일지 및 관련 데이터 삭제 (유저 정보는 유지)
TRUNCATE TABLE journal_events CASCADE;
TRUNCATE TABLE journals CASCADE;
-- TRUNCATE TABLE users CASCADE; -- 유저 정보도 초기화하려면 주석 해제
