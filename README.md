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

## 디렉토리 구조
- tests
    - screenhots : 테스트 스킵 또는 실패에 대한 이미지 캡처 파일 생성
    - xxx.spec.js : 구현 코드
- playwright.config.js : 설정파일
