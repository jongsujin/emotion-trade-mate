import {
  GET_DASHBOARD_SUMMARY_QUERY,
  GET_EMOTION_PERFORMANCE_QUERY,
  GET_RECENT_PNL_QUERY,
} from './query';

describe('reports sql query fx casting', () => {
  it('감정 성과 쿼리는 환율 파라미터를 numeric으로 캐스팅한다', () => {
    expect(GET_EMOTION_PERFORMANCE_QUERY).toContain('THEN 1::numeric');
    expect(GET_EMOTION_PERFORMANCE_QUERY).toContain('ELSE $2::numeric');
  });

  it('대시보드 요약 쿼리는 환율 파라미터를 numeric으로 캐스팅한다', () => {
    expect(GET_DASHBOARD_SUMMARY_QUERY).toContain('THEN 1::numeric');
    expect(GET_DASHBOARD_SUMMARY_QUERY).toContain('ELSE $2::numeric');
  });

  it('최근 손익 쿼리는 환율 파라미터를 numeric으로 캐스팅한다', () => {
    expect(GET_RECENT_PNL_QUERY).toContain('THEN 1::numeric');
    expect(GET_RECENT_PNL_QUERY).toContain('ELSE $2::numeric');
  });
});
