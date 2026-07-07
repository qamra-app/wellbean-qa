// Mobile audit: emulate a phone, walk through every section of the live site,
// screenshot each, and flag common mobile problems (horizontal overflow,
// console errors, cramped tap targets, menu behavior).
import { chromium, devices } from 'playwright'
import { mkdirSync } from 'fs'

const URL = process.env.SITE_URL ?? 'https://wellbean-qa.netlify.app'
const OUT = 'scripts/mobile-audit'
mkdirSync(OUT, { recursive: true })

const device = devices['iPhone 13'] // 390x844, DPR 3, touch
const browser = await chromium.launch()
const ctx = await browser.newContext({ ...device })
const page = await ctx.newPage()

const consoleErrors = []
page.on('console', (m) => { if (m.type() === 'error') consoleErrors.push(m.text()) })
page.on('pageerror', (e) => consoleErrors.push(String(e)))

await page.goto(URL, { waitUntil: 'networkidle' })
await page.waitForTimeout(2800) // hero entrance
await page.screenshot({ path: `${OUT}/01-hero.png` })

// --- horizontal overflow check ---
const overflow = await page.evaluate(() => {
  const docW = document.documentElement.scrollWidth
  const winW = window.innerWidth
  const offenders = []
  if (docW > winW + 1) {
    for (const el of document.querySelectorAll('*')) {
      const r = el.getBoundingClientRect()
      if (r.right > winW + 1 || r.left < -1) {
        const s = getComputedStyle(el)
        if (s.position === 'fixed' || s.display === 'none') continue
        offenders.push(`${el.tagName}.${String(el.className).slice(0, 60)} right=${Math.round(r.right)} left=${Math.round(r.left)}`)
        if (offenders.length >= 12) break
      }
    }
  }
  return { docW, winW, offenders }
})
console.log(`viewport ${overflow.winW}px, document ${overflow.docW}px ${overflow.docW > overflow.winW + 1 ? '— HORIZONTAL OVERFLOW' : '(ok)'}`)
overflow.offenders.forEach((o) => console.log('  overflow: ' + o))

// --- mobile menu test ---
await page.locator('button[aria-label="Toggle menu"]').tap()
await page.waitForTimeout(600)
await page.screenshot({ path: `${OUT}/02-mobile-menu.png` })
const menuLinkBox = await page.locator('nav.flex.flex-col a').first().boundingBox()
console.log(`mobile menu link height: ${menuLinkBox ? Math.round(menuLinkBox.height) : 'n/a'}px`)
await page.locator('nav.flex.flex-col a', { hasText: 'About' }).first().tap()
await page.waitForTimeout(1600)
await page.screenshot({ path: `${OUT}/03-after-menu-nav.png` })

// --- walk sections ---
const sections = [
  { sel: '#about', name: '04-about-top' },
  { sel: '#about .grid > div:nth-child(2)', name: '05-about-image' },
  { sel: '#visit', name: '06-visit-top' },
  { sel: '#visit .grid > div:nth-child(2)', name: '07-visit-image' },
  { sel: '#contact', name: '08-contact-top' },
  { sel: '#contact form', name: '09-contact-form' },
  { sel: 'footer', name: '10-footer' },
]
for (const s of sections) {
  const loc = page.locator(s.sel).first()
  try {
    await loc.scrollIntoViewIfNeeded()
    await page.waitForTimeout(1500)
    await page.screenshot({ path: `${OUT}/${s.name}.png` })
  } catch (e) {
    console.log(`  could not capture ${s.sel}: ${e.message.split('\n')[0]}`)
  }
}

// --- tap target + font size scan ---
const uxScan = await page.evaluate(() => {
  const issues = []
  for (const el of document.querySelectorAll('a, button, input, textarea')) {
    const r = el.getBoundingClientRect()
    if (r.width === 0 || r.height === 0) continue
    if (r.height < 40 && el.closest('nav, footer, form, header')) {
      issues.push(`small tap target (${Math.round(r.width)}x${Math.round(r.height)}): ${el.tagName} "${(el.textContent || el.getAttribute('aria-label') || el.getAttribute('placeholder') || '').trim().slice(0, 40)}"`)
    }
  }
  const tiny = []
  for (const el of document.querySelectorAll('p, span, a, label, h1, h2, h3')) {
    if (!el.textContent.trim()) continue
    const size = parseFloat(getComputedStyle(el).fontSize)
    if (size < 10) tiny.push(`${size}px: "${el.textContent.trim().slice(0, 40)}"`)
  }
  const meta = document.querySelector('meta[name="viewport"]')?.content ?? 'MISSING'
  return { issues: issues.slice(0, 20), tiny: tiny.slice(0, 10), viewportMeta: meta }
})
console.log('\nviewport meta: ' + uxScan.viewportMeta)
console.log('\ntap targets under 40px high:')
uxScan.issues.forEach((i) => console.log('  ' + i))
console.log('\ntext under 10px:')
uxScan.tiny.forEach((t) => console.log('  ' + t))

// --- form usability: input font size (iOS zooms if <16px) ---
const inputFont = await page.evaluate(() => {
  const inp = document.querySelector('#contact input[name="email"]')
  return inp ? getComputedStyle(inp).fontSize : 'n/a'
})
console.log(`\ncontact input font-size: ${inputFont} ${parseFloat(inputFont) < 16 ? '— iOS WILL AUTO-ZOOM on focus' : '(ok)'}`)

console.log('\nconsole errors: ' + (consoleErrors.length ? '' : 'none'))
consoleErrors.slice(0, 10).forEach((e) => console.log('  ' + e))

await browser.close()
console.log('\nAudit screenshots in ' + OUT)
