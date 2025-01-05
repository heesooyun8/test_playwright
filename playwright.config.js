// playwright.config.js

module.exports = {
  retries: 3, // 모든 테스트에 대해 기본적으로 3번 재시도
  timeout: 30000, // 테스트 시간 제한 30초
  use: {
    headless: false, // 브라우저 UI를 띄운 상태로 테스트 실행
  },
};
