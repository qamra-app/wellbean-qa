import { chromium, devices } from 'playwright'

const browser = await chromium.launch()

const testCases = [
  { name: 'iphone-se',     ctx: { ...devices['iPhone SE'] } },
  { name: 'iphone-14-pro', ctx: { ...devices['iPhone 14 Pro'] } },
  { name: 'iphone-13-nojs', ctx: { ...devices['iPhone 13'], javaScriptEnabled: false } },
]

for (const tc of testCases) {
  const ctx = await browser.newContext(tc.ctx)
  const p = await ctx.newPage()

  // Capture the very first paint (before JS settles) for JS-enabled cases
  await p.goto('https://wellbean-qa.netlify.app', { waitUntil: 'commit' })
  await p.waitForTimeout(200)
  await p.screenshot({ path: `scripts/debug-${tc.name}-early.png`, fullPage: false })
  await p.waitForLoadState('networkidle')
  await p.waitForTimeout(1500)
  await p.screenshot({ path: `scripts/debug-${tc.name}-settled.png`, fullPage: false })

  const info = await p.evaluate(() => ({
    vw: window.innerWidth, vh: window.innerHeight,
    docW: document.documentElement.scrollWidth,
    docH: document.documentElement.scrollHeight,
    viewportMeta: document.querySelector('meta[name=viewport]')?.content,
    // Check if any top-level element is wider than the viewport
    overflow: (() => {
      const out = []
      document.querySelectorAll('body > *, section, header, footer').forEach(el => {
        const r = el.getBoundingClientRect()
        if (r.right > window.innerWidth + 2) out.push(`${el.tagName} right=${Math.round(r.right)}`)
      })
      return out
    })(),
  }))

  console.log(`\n=== ${tc.name} ===`)
  console.log(JSON.stringify(info, null, 2))
  await ctx.close()
}

await browser.close()
