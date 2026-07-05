import { chromium } from 'playwright';

const b = await chromium.launch({ headless: true });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 20000 });
await p.waitForTimeout(4000);

await p.screenshot({ path: 'preview_hero.png' });

await p.evaluate(() => window.scrollBy(0, window.innerHeight * 1.2));
await p.waitForTimeout(2000);
await p.screenshot({ path: 'preview_about.png' });

await p.evaluate(() => window.scrollBy(0, window.innerHeight * 1.2));
await p.waitForTimeout(2000);
await p.screenshot({ path: 'preview_hours.png' });

await p.evaluate(() => window.scrollBy(0, window.innerHeight * 1.2));
await p.waitForTimeout(2000);
await p.screenshot({ path: 'preview_contact.png' });

await b.close();
console.log('screenshots done');
