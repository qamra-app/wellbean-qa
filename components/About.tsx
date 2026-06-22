'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { slideInLeft, fadeUp, staggerContainer } from '@/lib/animations'

const storyLines = [
  'Born from a love',
  'of the perfect',
  'cup.',
]

const lineReveal = {
  hidden: { y: '105%', opacity: 0 },
  visible: {
    y: '0%',
    opacity: 1,
    transition: { type: 'spring' as const, stiffness: 80, damping: 20 },
  },
}

const lineContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
}

const statCards = [
  {
    title: 'Single Origin',
    sub: 'Every cup traced to source',
  },
  {
    title: 'Specialty Grade',
    sub: '84+ SCA score, always',
  },
  {
    title: 'Craft Roasted',
    sub: 'Small batch, peak freshness',
  },
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-32 md:py-40 px-8 md:px-16 lg:px-24 bg-offwhite overflow-hidden"
    >
      {/* Vertical section label */}
      <span
        className="hidden lg:block absolute left-6 top-1/2 -translate-y-1/2 -rotate-90 origin-center font-sans text-[9px] uppercase tracking-[0.3em] text-midnight/30 whitespace-nowrap"
      >
        002 · About
      </span>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 max-w-6xl mx-auto">

        {/* ── Left Column ──────────────────────────────────── */}
        <motion.div
          variants={slideInLeft}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="flex flex-col"
        >
          {/* Eyebrow */}
          <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-espresso">
            Our Story
          </span>

          {/* Large quote headline — per-line reveal */}
          <motion.div
            variants={lineContainer}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="mt-4 font-serif font-light leading-tight text-midnight"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
          >
            {storyLines.map((line, i) => (
              <div key={i} className="overflow-hidden">
                <motion.span variants={lineReveal} className="block">
                  {line}
                </motion.span>
              </div>
            ))}
          </motion.div>

          {/* Divider */}
          <div className="border-t border-espresso/20 my-8" />

          {/* Detail line */}
          <p className="font-sans text-xs uppercase tracking-[0.2em] text-midnight/40">
            Specialty Coffee · Qatar · Est. 2025
          </p>
        </motion.div>

        {/* ── Right Column ─────────────────────────────────── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="flex flex-col"
        >
          {/* Body copy */}
          <motion.div variants={fadeUp}>
            <p className="font-sans text-base leading-[1.8] text-midnight/70 max-w-[52ch]">
              WellBean is more than a coffee shop. We&apos;re your daily ritual,
              your quiet corner, your bestie in specialty coffee.
            </p>
            <p className="font-sans text-base leading-[1.8] text-midnight/70 max-w-[52ch] mt-4">
              Every bean we source, every cup we brew is a testament to
              the craft — to the farmers who grew it, the roasters who
              coaxed it, and you, who deserve nothing less.
            </p>
            <p className="font-sans text-base leading-[1.8] text-midnight/70 max-w-[52ch] mt-4">
              Opening soon in Qatar, WellBean brings world-class specialty
              coffee to a community that&apos;s ready for it.
            </p>
          </motion.div>

          {/* Stat / value cards */}
          <motion.div
            variants={fadeUp}
            className="grid grid-cols-3 gap-4 mt-12"
          >
            {statCards.map((card) => (
              <div
                key={card.title}
                className="border border-espresso/10 rounded-xl p-4 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-espresso/30 hover:shadow-[0_4px_24px_rgba(61,31,13,0.06)]"
              >
                <p className="font-serif text-lg font-medium text-midnight leading-snug">
                  {card.title}
                </p>
                <p className="font-sans text-xs text-midnight/50 mt-1 leading-snug">
                  {card.sub}
                </p>
              </div>
            ))}
          </motion.div>

          {/* Portrait image */}
          <motion.div
            variants={fadeUp}
            className="relative w-full mt-8 rounded-2xl overflow-hidden"
            style={{ aspectRatio: '3/2' }}
          >
            <Image
              src="https://picsum.photos/seed/coffeecraft/600/400"
              alt="Craft coffee being prepared"
              fill
              unoptimized
              className="
                object-cover
                grayscale-[30%]
                transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]
                hover:grayscale-0 hover:scale-[1.02]
              "
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
