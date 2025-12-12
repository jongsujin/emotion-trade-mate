-- 이벤트-감정 연결 (한 이벤트에 감정 여러개 가능)
CREATE TABLE journal_event_emotions (
  event_id INT NOT NULL REFERENCES journal_events(id) ON DELETE CASCADE,
  emotion_tag_id INT NOT NULL REFERENCES emotion_tags(id) ON DELETE CASCADE,
  PRIMARY KEY (event_id, emotion_tag_id)
);