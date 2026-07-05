import { chromium } from 'playwright';
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  viewport: { width: 1280, height: 900 }
});
const designs = [
  { id: 1, url: 'https://www.canva.com/d/2fnYvcDbadCnklb' },
  { id: 2, url: 'https://www.canva.com/d/gtfFq_Z_x7ClF_c' },
  { id: 3, url: 'https://www.canva.com/d/3sc2QFQ0Ux33MJI' },
  { id: 4, url: 'https://www.canva.com/d/N5iTra5kQOKqnHF' },
];
for (const d of designs) {
  const page = await context.newPage();
  try {
    await page.goto(d.url, { waitUntil: 'domcontentloaded', timeout: 20000 });
    await page.waitForTimeout(4000);
    await page.screenshot({ path: `brand_opt_${d.id}.png` });
    console.log(`Option ${d.id} done`);
  } catch(e) { console.log(`Option ${d.id} error: ${e.message}`); }
  await page.close();
}
await browser.close();
