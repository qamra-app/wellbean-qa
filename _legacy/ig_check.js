const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
  try {
    await page.goto('https://www.instagram.com/wellbean.qa/', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(3000);
    await page.screenshot({ path: 'C:/Users/aalad/Projects/coffee-shop-website/ig_wellbean.png', fullPage: false });
    console.log('screenshot saved');
    const title = await page.title();
    console.log('title:', title);
  } catch(e) {
    console.log('error:', e.message);
  }
  await browser.close();
})();
