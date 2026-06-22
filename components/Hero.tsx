'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { ArrowRight } from '@phosphor-icons/react'
import { staggerContainer, fadeUp } from '@/lib/animations'

const wordReveal = {
  hidden: { y: '105%', opacity: 0 },
  visible: {
    y: '0%',
    opacity: 1,
    transition: { type: 'spring' as const, stiffness: 80, damping: 20 },
  },
}

const wordContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.10, delayChildren: 0.05 },
  },
}

// Marquee text — repeated so the seamless loop works
const MARQUEE_TEXT =
  'SPECIALTY COFFEE · ETHICALLY SOURCED · YOUR DAILY RITUAL · DOHA QATAR · WELL-BEAN-ING · '

export default function Hero() {
  const ctaRef = useRef<HTMLButtonElement>(null)

  // Magnetic button effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 200, damping: 25 })
  const springY = useSpring(mouseY, { stiffness: 200, damping: 25 })

  function handleMouseMove(e: React.MouseEvent<HTMLButtonElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    mouseX.set((e.clientX - cx) * 0.3)
    mouseY.set((e.clientY - cy) * 0.3)
  }

  function handleMouseLeave() {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex items-center px-8 md:px-16 lg:px-24 pt-24 overflow-hidden"
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="w-full flex flex-col md:flex-row items-center md:items-start gap-16 md:gap-0"
      >
        {/* ── Left Column ──────────────────────────────────── */}
        <div className="flex-1 md:w-7/12 flex flex-col justify-center">
          {/* Eyebrow badge */}
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2 rounded-full border border-espresso/20 px-4 py-1.5 font-sans text-[10px] uppercase tracking-[0.25em] text-espresso/70">
              Specialty Coffee · Qatar
            </span>
          </motion.div>

          {/* Main headline — "Well" / "Bean" staggered word reveal */}
          <motion.div
            variants={wordContainer}
            className="mt-6 font-serif leading-[0.9] tracking-tight text-midnight select-none"
            style={{ fontSize: 'clamp(5rem, 12vw, 10rem)' }}
          >
            {/* "Well" — line 1 */}
            <div className="overflow-hidden">
              <motion.span variants={wordReveal} className="block">
                Well
              </motion.span>
            </div>
            {/* "Bean" — line 2, indented */}
            <div className="overflow-hidden">
              <motion.span variants={wordReveal} className="block ml-8 md:ml-16">
                Bean
              </motion.span>
            </div>
          </motion.div>

          {/* Italic sub-line */}
          <motion.p
            variants={fadeUp}
            className="font-serif italic font-light text-espresso/80 mt-6"
            style={{ fontSize: 'clamp(1.4rem, 3vw, 1.875rem)' }}
          >
            &ldquo;Your daily dose of well-bean-ing&rdquo;
          </motion.p>

          {/* CTA */}
          <motion.div variants={fadeUp} className="mt-10">
            <motion.button
              ref={ctaRef}
              style={{ x: springX, y: springY }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="
                group inline-flex items-center gap-3
                rounded-full bg-espresso text-linen
                font-sans text-sm font-medium
                px-8 py-4
                transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]
                hover:bg-midnight
                cursor-pointer
              "
            >
              Opening Soon in Doha
              <span className="w-7 h-7 rounded-full bg-linen/10 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRight size={14} weight="bold" />
              </span>
            </motion.button>
          </motion.div>
        </div>

        {/* ── Right Column ─────────────────────────────────── */}
        <div className="flex-shrink-0 md:w-5/12 flex flex-col items-center justify-center">
          {/* Rotating Brand SVG */}
          <motion.svg
            viewBox="0 0 100 100"
            className="w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          >
            {/* Outer decorative circle */}
            <circle cx="50" cy="50" r="47" stroke="#0D0D0D" strokeWidth="0.8" fill="none" />
            {/* Inner circle */}
            <circle cx="50" cy="50" r="38" stroke="#0D0D0D" strokeWidth="1.2" fill="none" />
            {/* Coffee bean silhouette — figure-8 at 45° */}
            <path
              d="M 35 50 Q 50 25 65 50 Q 50 75 35 50 Z"
              stroke="#0D0D0D"
              strokeWidth="1.5"
              fill="none"
            />
            {/* Center crease line */}
            <line x1="50" y1="27" x2="50" y2="73" stroke="#0D0D0D" strokeWidth="0.8" opacity="0.4" />
            {/* Cardinal dot accents */}
            <circle cx="50" cy="27" r="2" fill="#0D0D0D" />
            <circle cx="50" cy="73" r="2" fill="#0D0D0D" />
            <circle cx="27" cy="50" r="1.5" fill="#0D0D0D" />
            <circle cx="73" cy="50" r="1.5" fill="#0D0D0D" />
            {/* Diagonal micro dots */}
            <circle cx="36" cy="36" r="1" fill="#0D0D0D" opacity="0.4" />
            <circle cx="64" cy="64" r="1" fill="#0D0D0D" opacity="0.4" />
            <circle cx="64" cy="36" r="1" fill="#0D0D0D" opacity="0.4" />
            <circle cx="36" cy="64" r="1" fill="#0D0D0D" opacity="0.4" />
          </motion.svg>

          {/* Stacked text badge below SVG */}
          <motion.p
            variants={fadeUp}
            className="font-sans text-[10px] uppercase tracking-[0.3em] text-midnight/40 text-center mt-4"
          >
            Est. 2025 · Doha, Qatar
          </motion.p>
        </div>
      </motion.div>

      {/* ── Kinetic Marquee Strip ─────────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-espresso/10 py-4 overflow-hidden">
        <motion.div
          className="flex whitespace-nowrap gap-0"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          {/* Two copies so the seamless loop works */}
          {[0, 1].map((i) => (
            <span
              key={i}
              className="font-sans text-[10px] uppercase tracking-[0.2em] text-midnight/40 pr-0"
            >
              {MARQUEE_TEXT.repeat(8)}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
