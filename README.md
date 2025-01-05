# qa_automation_test

## 설치
```
  npm install playwright
  npm install @playwright/test
```

## 실행 및 리포트 생성
```
  npx playwright test --reporter=html
```

## 디렉토리 및 파일 설명
- tests
    - screenhots : 테스트 스킵 또는 실패에 대한 이미지 캡처 파일 생성
    - desktop-tests.spec.js : 구현 코드
- playwright.config.js : 설정파일
- playwright-report
    - index.html : 테스트 결과를 리포트로 발행
    - https://github.com/heesooyun8/test_playwright/blob/main/playwright-report/test.mov : 테스트 수행 영상 (용량 문제로 다운로드 필요)
