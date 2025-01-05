import { test, expect } from "@playwright/test";
import fs from "fs";
import path from "path";

// 드롭다운 메뉴
const categories = [
  "All Departments",
  "Arts & Crafts",
  "Automotive",
  "Baby",
  "Beauty & Personal Care",
  "Books",
  "Boys' Fashion",
  "Computers",
  "Deals",
  "Digital Music",
  "Electronics",
  "Girls' Fashion",
  "Health & Household",
  "Home & Kitchen",
  "Industrial & Scientific",
  "Kindle Store",
  "Luggage",
  "Men's Fashion",
  "Movies & TV",
  "Music, CDs & Vinyl",
  "Pet Supplies",
  "Prime Video",
  "Software",
  "Sports & Outdoors",
  "Tools & Home Improvement",
  "Toys & Games",
  "Video Games",
  "Women's Fashion",
];

test.describe.parallel("Amazon 드롭다운 메뉴 테스트", () => {
  test.describe.configure({ retries: 3 }); // 전체 테스트 그룹에 대해 3번 재시도

  const screenshotDir = path.join(__dirname, "screenshots");
  if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir); // 폴더가 없으면 생성

  categories.forEach((category) => {
    test(`${category} 드롭다운 항목 검색결과 가져오기`, async ({ page }) => {
      const searchTerm = `${category} products`;
      console.log(
        `Test started for category: ${category}, with search term: "${searchTerm}"`
      );

      try {
        await page.goto("https://www.amazon.com", { timeout: 60000 });

        // CAPTCHA 화면이 보이면 테스트 스킵
        // 테스트 스킵에 대한 스크린샷
        const captcha = await page.locator(
          "text=Enter the characters you see below"
        );
        const isCaptchaVisible = await captcha.isVisible();
        if (isCaptchaVisible) {
          console.log(
            `CAPTCHA detected, skipping test for category: ${category}`
          );
          const screenshotPath = path.join(
            screenshotDir,
            `${category}_captcha_skip_${new Date()
              .toISOString()
              .replace(/[:.-]/g, "_")}.png`
          );
          await page.screenshot({ path: screenshotPath });
          console.log(`Screenshot saved at: ${screenshotPath}`);
          test.skip();
          return;
        }

        // 드롭다운 메뉴가 보일 때까지 대기
        const dropdown = await page.locator("#nav-search-dropdown-card");
        await dropdown.waitFor({ state: "visible", timeout: 10000 });

        await dropdown.click({ timeout: 5000 });
        await page.selectOption("#searchDropdownBox", { label: category });

        await page.waitForSelector("#twotabsearchtextbox", { timeout: 5000 });

        const searchBox = await page.locator("#twotabsearchtextbox");
        await searchBox.fill(searchTerm, { timeout: 5000 });
        await searchBox.press("Enter");

        await page.waitForSelector("#search", { timeout: 10000 });

        // 검색 결과 확인
        const searchResult = await page.locator("#search");
        const resultText = await searchResult.innerText();
        await expect(resultText).toContain(category);
      } catch (error) {
        const retries = test.info().retry;
        // 재시도 3회까지 했는데도 pass하지 못하면 스크린샷
        if (retries === 3) {
          const screenshotPath = path.join(
            screenshotDir,
            `${category}_fail_${new Date()
              .toISOString()
              .replace(/[:.-]/g, "_")}.png`
          );
          await page.screenshot({ path: screenshotPath });
          console.log(`Screenshot saved at: ${screenshotPath}`);
        }

        console.error(`Test failed for category: ${category}`);
        throw error;
      }

      console.log(`Test completed for category: ${category}`);
    });
  });
});
