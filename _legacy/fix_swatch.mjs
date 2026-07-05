import { chromium } from 'playwright';

const browser = await chromium.launchPersistentContext(
  'C:\\Users\\aalad\\AppData\\Local\\Google\\Chrome\\User Data',
  {
    channel: 'chrome',
    headless: false,
    viewport: { width: 1400, height: 900 },
    args: ['--profile-directory=Default']
  }
);

const page = await browser.newPage();

try {
  // Open the Canva edit URL
  console.log('Navigating to Canva design...');
  await page.goto('https://www.canva.com/d/3fvof-ftx8Fr8jg', {
    waitUntil: 'domcontentloaded',
    timeout: 30000
  });
  await page.waitForTimeout(5000);

  console.log('Title:', await page.title());
  await page.screenshot({ path: 'canva_edit_1.png' });

  // Wait for the editor to fully load
  await page.waitForTimeout(5000);
  await page.screenshot({ path: 'canva_edit_2.png' });

  console.log('Done — check canva_edit_2.png');
} catch (e) {
  console.log('Error:', e.message);
  await page.screenshot({ path: 'canva_error.png' });
}

// Keep open for 10 seconds so we can see what happened
await page.waitForTimeout(10000);
await browser.close();
