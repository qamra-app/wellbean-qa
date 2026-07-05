import { chromium } from 'playwright';
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  viewport: { width: 1280, height: 900 }
});
const page = await context.newPage();
await page.goto('https://www.instagram.com/wellbean.qa/', { waitUntil: 'domcontentloaded', timeout: 20000 });
await page.waitForTimeout(4000);
// close modal if present
try {
  const closeBtn = await page.$('[aria-label="Close"]');
  if (closeBtn) { await closeBtn.click(); await page.waitForTimeout(1000); }
} catch(e) {}
// dismiss login overlay
await page.keyboard.press('Escape');
await page.waitForTimeout(1500);
await page.screenshot({ path: 'ig_profile_clean.png', fullPage: true });
console.log('done');
await browser.close();
