module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat", // 새로운 기능
        "fix", // 버그 수정
        "docs", // 문서 변경
        "style", // 코드 포맷팅, 세미콜론 등 (코드 변경 없음)
        "refactor", // 리팩토링
        "perf", // 성능 개선
        "test", // 테스트 추가/수정
        "chore", // 빌드, 설정 변경
        "revert", // 커밋 되돌리기
      ],
    ],
    "subject-case": [0], // 제목 케이스 체크 안함 (한글 허용)
  },
};
