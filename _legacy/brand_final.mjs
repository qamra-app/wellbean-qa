import { chromium } from 'playwright';
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  viewport: { width: 1400, height: 900 }
});
const page = await context.newPage();
await page.goto('https://www.canva.com/d/dxKYoH6NsbQAZBn', { waitUntil: 'networkidle', timeout: 30000 });
await page.waitForTimeout(5000);
await page.screenshot({ path: 'brand_final.png', fullPage: false });
console.log('done');
await browser.close();
