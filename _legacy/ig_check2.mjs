import { chromium } from 'playwright';
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  viewport: { width: 1280, height: 900 }
});
const page = await context.newPage();
try {
  await page.goto('https://www.instagram.com/wellbean.qa/', { waitUntil: 'domcontentloaded', timeout: 20000 });
  await page.waitForTimeout(5000);
  console.log('title:', await page.title());
  console.log('url:', page.url());
  await page.screenshot({ path: 'ig_wellbean_qa2.png' });
  console.log('done');
} catch(e) { console.log('error:', e.message); }
await browser.close();
