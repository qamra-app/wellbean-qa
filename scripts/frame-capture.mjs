import { chromium, devices } from 'playwright'

const URL = process.env.SITE_URL ?? 'http://localhost:4173'

const browser = await chromium.launch()

for (const [label, ms] of [['0ms', 0], ['200ms', 200], ['600ms', 600], ['1500ms', 1500], ['3000ms', 3000]]) {
  const ctx = await browser.newContext({ ...devices['iPhone 13'] })
  const p = await ctx.newPage()
  await p.goto(URL, { waitUntil: 'commit' })
  if (ms > 0) await p.waitForTimeout(ms)
  await p.screenshot({ path: `scripts/frame-${label}.png`, fullPage: false })
  await ctx.close()
}

await browser.close()
console.log('Frames captured.')
