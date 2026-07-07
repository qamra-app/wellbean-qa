// Verifies the progressive-enhancement fix:
// 1. With JavaScript disabled, all key content must be visible (opacity 1).
// 2. With JavaScript enabled, entrance animations play and content ends visible,
//    including sections scrolled into view.
import { chromium } from 'playwright'

const URL = process.env.SITE_URL ?? 'http://localhost:4173'

const checks = [
  { label: 'Hero headline "Well"', selector: 'h1' },
  { label: 'About headline', text: "We're your" },
  { label: 'About body copy', text: 'WellBean brings specialty-grade coffee' },
  { label: 'Hours headline', text: 'Find us in' },
  { label: 'Contact headline', text: 'Be the first' },
  { label: 'Footer tagline', text: 'daily dose of well-bean-ing' },
]

async function assertVisible(page, mode) {
  let failures = 0
  for (const c of checks) {
    const loc = c.selector ? page.locator(c.selector).first() : page.getByText(c.text).first()
    const info = await loc.evaluate((el) => {
      // walk up the tree: any ancestor at opacity ~0 hides this node
      let node = el
      while (node && node instanceof Element) {
        const s = getComputedStyle(node)
        if (parseFloat(s.opacity) < 0.05 || s.visibility === 'hidden' || s.display === 'none') {
          return { hidden: true, tag: node.tagName, opacity: s.opacity, transform: s.transform }
        }
        node = node.parentElement
      }
      const r = el.getBoundingClientRect()
      return { hidden: false, w: r.width, h: r.height }
    })
    if (info.hidden) {
      failures++
      console.log(`  FAIL [${mode}] ${c.label}: hidden by <${info.tag}> opacity=${info.opacity}`)
    } else {
      console.log(`  ok   [${mode}] ${c.label}`)
    }
  }
  return failures
}

let totalFailures = 0
const browser = await chromium.launch()

// --- Pass 1: JS disabled (simulates the friend's broken-JS situation) ---
{
  const ctx = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1280, height: 800 } })
  const page = await ctx.newPage()
  await page.goto(URL, { waitUntil: 'load' })
  console.log('\n--- JS DISABLED ---')
  totalFailures += await assertVisible(page, 'no-js')
  await page.screenshot({ path: 'scripts/shot-nojs-top.png' })
  await ctx.close()
}

// --- Pass 2: JS enabled (normal visitors — animations must still work) ---
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } })
  const page = await ctx.newPage()
  await page.goto(URL, { waitUntil: 'networkidle' })
  await page.waitForTimeout(2500) // let hero entrance finish
  console.log('\n--- JS ENABLED (after load) ---')
  // hero should have animated back in
  const heroCheck = [checks[0]]
  for (const c of heroCheck) {
    const visible = await page.locator('h1').first().evaluate((el) => {
      let node = el
      while (node && node instanceof Element) {
        const s = getComputedStyle(node)
        if (parseFloat(s.opacity) < 0.05) return false
        node = node.parentElement
      }
      return true
    })
    console.log(visible ? '  ok   [js] Hero visible after entrance' : '  FAIL [js] Hero still hidden')
    if (!visible) totalFailures++
  }
  await page.screenshot({ path: 'scripts/shot-js-hero.png' })

  // sections hide again when scrolled out of view (once:false is intentional),
  // so assert each one while it is actually in the viewport
  const sectionChecks = [
    { anchor: '#about', items: [checks[1], checks[2]] },
    { anchor: '#visit', items: [checks[3]] },
    { anchor: '#contact', items: [checks[4]] },
    { anchor: 'footer', items: [checks[5]] },
  ]
  for (const s of sectionChecks) {
    await page.locator(s.anchor).scrollIntoViewIfNeeded()
    await page.waitForTimeout(1600)
    for (const c of s.items) {
      const loc = c.selector ? page.locator(c.selector).first() : page.getByText(c.text).first()
      const hidden = await loc.evaluate((el) => {
        let node = el
        while (node && node instanceof Element) {
          const st = getComputedStyle(node)
          if (parseFloat(st.opacity) < 0.05) return true
          node = node.parentElement
        }
        return false
      })
      console.log(hidden ? `  FAIL [js-inview] ${c.label}` : `  ok   [js-inview] ${c.label}`)
      if (hidden) totalFailures++
    }
  }
  await page.screenshot({ path: 'scripts/shot-js-bottom.png' })
  await ctx.close()
}

await browser.close()
console.log(totalFailures === 0 ? '\nALL CHECKS PASSED' : `\n${totalFailures} CHECKS FAILED`)
process.exit(totalFailures === 0 ? 0 : 1)
