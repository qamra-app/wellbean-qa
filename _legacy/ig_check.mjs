import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  viewport: { width: 1280, height: 900 }
});
const page = await context.newPage();

const handles = ['wellbeain.qa', 'wellbean.qa', 'wellbeanqa'];
for (const handle of handles) {
  try {
    console.log(`Trying @${handle} ...`);
    await page.goto(`https://www.instagram.com/${handle}/`, { waitUntil: 'domcontentloaded', timeout: 20000 });
    await page.waitForTimeout(4000);
    const title = await page.title();
    console.log('Page title:', title);
    const url = page.url();
    console.log('Final URL:', url);
    await page.screenshot({ path: `ig_${handle.replace('.', '_')}.png`, fullPage: false });
    console.log(`Screenshot saved: ig_${handle.replace('.', '_')}.png`);
    break;
  } catch(e) {
    console.log(`Error for @${handle}:`, e.message);
  }
}

await browser.close();
