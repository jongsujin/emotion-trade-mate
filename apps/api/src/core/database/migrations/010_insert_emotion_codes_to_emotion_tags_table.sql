-- 감정 태그 데이터 삽입 (여러 개의 작은 INSERT 문으로 분리)

-- 기본 감정
INSERT INTO emotion_tags (code, label_ko) VALUES ('FEAR', '공포');
INSERT INTO emotion_tags (code, label_ko) VALUES ('GREED', '탐욕');

-- 자신감 & 확신
INSERT INTO emotion_tags (code, label_ko) VALUES ('CONFIDENT', '자신감');
INSERT INTO emotion_tags (code, label_ko) VALUES ('DOUBT', '의심');

-- 희망 & 절망
INSERT INTO emotion_tags (code, label_ko) VALUES ('HOPE', '희망');
INSERT INTO emotion_tags (code, label_ko) VALUES ('DESPAIR', '절망');

-- 흥분 & 불안
INSERT INTO emotion_tags (code, label_ko) VALUES ('EXCITED', '흥분');
INSERT INTO emotion_tags (code, label_ko) VALUES ('ANXIOUS', '불안');

-- 만족 & 후회
INSERT INTO emotion_tags (code, label_ko) VALUES ('SATISFIED', '만족');
INSERT INTO emotion_tags (code, label_ko) VALUES ('REGRET', '후회');

-- 분노 & 평온
INSERT INTO emotion_tags (code, label_ko) VALUES ('ANGRY', '분노');
INSERT INTO emotion_tags (code, label_ko) VALUES ('CALM', '평온');

-- 스트레스 & 안정
INSERT INTO emotion_tags (code, label_ko) VALUES ('STRESSED', '스트레스');
INSERT INTO emotion_tags (code, label_ko) VALUES ('RELAXED', '안정');

-- 낙관 & 비관
INSERT INTO emotion_tags (code, label_ko) VALUES ('OPTIMISTIC', '낙관적');
INSERT INTO emotion_tags (code, label_ko) VALUES ('PESSIMISTIC', '비관적');

-- 충동 & 신중
INSERT INTO emotion_tags (code, label_ko) VALUES ('IMPULSIVE', '충동적');
INSERT INTO emotion_tags (code, label_ko) VALUES ('CAUTIOUS', '신중한');

-- 패닉 & 냉정
INSERT INTO emotion_tags (code, label_ko) VALUES ('PANIC', '패닉');
INSERT INTO emotion_tags (code, label_ko) VALUES ('RATIONAL', '냉정한');

-- 극단 감정
INSERT INTO emotion_tags (code, label_ko) VALUES ('EXTREME_GREED', '극심한 탐욕');
INSERT INTO emotion_tags (code, label_ko) VALUES ('EXTREME_FEAR', '극심한 공포');

-- 장기적 감정
INSERT INTO emotion_tags (code, label_ko) VALUES ('LONG_TERM_CONFIDENCE', '장기적 자신감');
INSERT INTO emotion_tags (code, label_ko) VALUES ('SHORT_TERM_DOUBT', '단기적 의심');