import { chromium } from 'playwright';
import { createServer } from 'http';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Step 1: use Playwright to render a black square and save as PNG
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 345, height: 377 } });
await page.setContent('<html><body style="margin:0;padding:0;background:#0D0D0D;width:345px;height:377px"></body></html>');
await page.waitForTimeout(500);
await page.screenshot({ path: join(__dirname, 'black_swatch.png'), clip: { x: 0, y: 0, width: 345, height: 377 } });
await browser.close();
console.log('black_swatch.png created');

// Step 2: serve it on localhost:9191 so Canva can fetch it
const server = createServer((req, res) => {
  const img = readFileSync(join(__dirname, 'black_swatch.png'));
  res.writeHead(200, { 'Content-Type': 'image/png', 'Content-Length': img.length });
  res.end(img);
});
server.listen(9191, () => console.log('Serving black_swatch.png at http://localhost:9191/black.png'));
