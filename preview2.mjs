import { chromium } from 'playwright';

const b = await chromium.launch({ headless: true });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto('http://localhost:3001', { waitUntil: 'networkidle', timeout: 25000 });
await p.waitForTimeout(3000);
await p.screenshot({ path: 'v2_hero.png' });

await p.evaluate(() => window.scrollBy(0, window.innerHeight * 1.1));
await p.waitForTimeout(2000);
await p.screenshot({ path: 'v2_about.png' });

await p.evaluate(() => window.scrollBy(0, window.innerHeight * 1.1));
await p.waitForTimeout(2000);
await p.screenshot({ path: 'v2_hours.png' });

await p.evaluate(() => window.scrollBy(0, window.innerHeight * 1.1));
await p.waitForTimeout(2000);
await p.screenshot({ path: 'v2_contact.png' });

await b.close();
console.log('done');
