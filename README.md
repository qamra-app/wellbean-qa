# WellBean — Specialty Coffee Website

Coming-soon website for **WellBean**, a specialty coffee shop opening in Doha, Qatar.

**Live site:** https://wellbean-qa.netlify.app

---

## What to Edit

This is the quick-reference guide for making common changes to the website.
Each row tells you exactly which file to open and what to look for.

### Text & Content

| What you want to change | File to open | What to look for |
|:---|:---|:---|
| Big headline ("Well / Bean.") | `components/Hero.tsx` | `const words = ['Well', 'Bean.']` |
| Tagline under headline | `components/Hero.tsx` | `Your daily dose of well-bean-ing` |
| Eyebrow text ("Specialty Coffee · Opening Soon in Qatar") | `components/Hero.tsx` | `Specialty Coffee · Opening Soon in Qatar` |
| About section headline ("We're your daily ritual.") | `components/About.tsx` | `const headlineLines` |
| About section body paragraphs | `components/About.tsx` | The two `<p>` blocks after the headline |
| About stats (2026, 87+, QA) | `components/About.tsx` | Look for `number:` and `label:` inside the stats array |
| "Find us in Doha." headline | `components/Hours.tsx` | `Find us in` and `Doha.` |
| One-liner under location | `components/Hours.tsx` | `A quiet corner for the unhurried cup` |
| Address / Instagram / website | `components/Hours.tsx` | The three `<p>` lines inside the address block |
| Opening hours (Sun – Thu) | `components/Hours.tsx` | `const hoursData` at the top of the file |
| Contact section headline | `components/Contact.tsx` | `Let's talk coffee.` |
| Contact sub-text | `components/Contact.tsx` | `Got questions about our opening` |
| Instagram handle | `components/Contact.tsx` + `components/Footer.tsx` | `@wellbean.qa` |
| WhatsApp link | `components/Contact.tsx` + `components/Footer.tsx` | `href` on the WhatsApp link |
| Email address | `components/Contact.tsx` | `hello@wellbean.qa` |
| Footer tagline quote | `components/Footer.tsx` | `Your daily dose of well-bean-ing` |
| Copyright year | `components/Footer.tsx` | `2026 WellBean` |

---

### Images & Logo

| What you want to change | File to open | What to look for |
|:---|:---|:---|
| Hero background photo | `components/Hero.tsx` | The `unsplash.com` image URL inside the `<Image>` tag |
| About section photo | `components/About.tsx` | The `unsplash.com` image URL inside the `<Image>` tag |
| Hours / Visit section photo | `components/Hours.tsx` | The `unsplash.com` image URL inside the `<Image>` tag |
| Logo (nav + footer) | Replace the file `public/wellbean-logo.jpg` | Keep the same filename so no code changes are needed |

---

### Colors

Open `app/globals.css` and find the `@theme inline` block at the top.

| Token | Hex | Used for |
|:---|:---|:---|
| espresso | #1C0A02 | Hero + footer background |
| brown | #6B3A2A | Accent dot, hover states |
| cream | #FFF8F0 | Text on dark backgrounds |
| sand | #F0E6D6 | About section background |
| clay | #EDE0CE | Contact section background |
| charcoal | #1A1A1A | Body text on light backgrounds |

Change any hex value there and it updates everywhere on the site automatically.

---

### Social Links & Contact Info

| What | File | Line to find |
|:---|:---|:---|
| Instagram URL | `components/Footer.tsx` | `href="https://instagram.com/wellbean.qa"` |
| Instagram handle display | `components/Contact.tsx` + `components/Footer.tsx` | `@wellbean.qa` |
| WhatsApp number | `components/Contact.tsx` | The `href` on the WhatsApp `<a>` tag — use format `https://wa.me/97412345678` |
| Email | `components/Contact.tsx` | `hello@wellbean.qa` |

---

## Getting Started (for developers)

### Prerequisites
- Node.js 18+
- npm

### Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

### Build & deploy

```bash
npm run build
netlify deploy --prod --dir=out
```

---

## Project Structure

```
├── app/
│   ├── globals.css        # Colors, fonts, steam animation keyframes
│   ├── layout.tsx         # Root layout + Google Fonts
│   └── page.tsx           # Assembles all sections into one page
├── components/
│   ├── Nav.tsx            # Top navigation bar
│   ├── Hero.tsx           # Full-screen opening section
│   ├── About.tsx          # Brand story + stats
│   ├── Hours.tsx          # Location & opening hours
│   ├── Contact.tsx        # Contact form + social links
│   └── Footer.tsx         # Footer
├── lib/
│   └── animations.ts      # Shared scroll animations
├── public/
│   └── wellbean-logo.jpg  # Brand logo image
└── netlify.toml           # Netlify configuration
```

---

## Notes

- **Hours** — set to `Sun – Thu` with `—` until confirmed. Update `hoursData` in `components/Hours.tsx`.
- **Contact form** — the form UI is built but not wired to a backend yet. Ask the developer to connect it when ready.
- **Hero parallax** — the coffee bean background moves with the mouse on desktop. This is intentional.
- **Steam animation** — the rising steam in the hero is desktop-only.
