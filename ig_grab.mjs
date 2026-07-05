import { chromium } from 'playwright';

const b = await chromium.launch({ headless: true });
const p = await b.newPage({ viewport: { width: 1280, height: 800 } });
await p.goto('https://www.instagram.com/wellbean.qa/', { waitUntil: 'domcontentloaded', timeout: 20000 });
await p.waitForTimeout(5000);
await p.screenshot({ path: 'ig_profile.png', fullPage: false });

// Try various selectors for the profile picture
const selectors = ['header img', 'img[alt*="wellbean" i]', 'img[alt*="profile" i]', 'section img'];
for (const sel of selectors) {
  const el = await p.$(sel);
  if (el) {
    const src = await el.getAttribute('src');
    console.log('FOUND:', sel, '->', src?.substring(0, 120));
  }
}

await b.close();
console.log('done');
