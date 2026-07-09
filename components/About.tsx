'use client'

import { useRef, useEffect } from 'react'
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import Image from 'next/image'
import { slideInLeft, scaleIn, staggerContainer, floatUp, useReveal } from '@/lib/animations'

const headlineLines = ["We're your", 'daily ritual.']

const lineReveal = {
  hidden: { y: '110%' },
  visible: (i: number) => ({
    y: '0%',
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 18,
      delay: i * 0.12,
    },
  }),
}

const stats = [
  { target: 2026, suffix: '', label: 'Est.' },
  { target: 87, suffix: '+', label: 'SCA Cup Score' },
  { target: 100, suffix: '%', label: 'Single Origin' },
]

function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  // Starts at the final value so static HTML shows real numbers without JS;
  // reset to 0 right before the first count-up.
  const count = useMotionValue(target)
  const rounded = useTransform(count, (v: number) => Math.floor(v))
  const inView = useInView(ref, { once: false, margin: '-40px' })
  const started = useRef(false)

  useEffect(() => {
    if (!inView) return
    if (!started.current) {
      started.current = true
      count.set(0)
    }
    const controls = animate(count, target, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
    })
    return () => controls.stop()
  }, [inView, count, target])

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>{suffix}
    </span>
  )
}

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  const leftControls = useReveal(leftRef, { once: false, margin: '-60px' })
  const rightControls = useReveal(rightRef, { once: false, margin: '-60px' })
  const headlineControls = useReveal(sectionRef, { once: false, margin: '-60px' })
  const statsControls = useReveal(statsRef, { once: false, margin: '-40px' })

  return (
    <section id="about" ref={sectionRef} className="bg-sand py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section header */}
        <div className="flex items-center gap-6 mb-20">
          <span className="font-sans text-xs uppercase tracking-[0.2em] text-charcoal/30">About</span>
          <div className="flex-1 h-px bg-charcoal/10" />
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left column */}
          <motion.div
            ref={leftRef}
            variants={slideInLeft}
            initial="visible"
            animate={leftControls}
          >
            {/* Headline */}
            <div>
              {headlineLines.map((line, i) => (
                <div key={line} className="overflow-hidden">
                  <motion.h2
                    custom={i}
                    variants={lineReveal}
                    initial="visible"
                    animate={headlineControls}
                    className="font-display font-bold text-espresso leading-[1.05] tracking-tight"
                    style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
                  >
                    {line}
                  </motion.h2>
                </div>
              ))}
            </div>

            {/* Body copy */}
            <p className="mt-8 font-sans text-base leading-[1.8] text-charcoal/65 max-w-[44ch]">
              WellBean brings specialty-grade coffee to Doha. Single-origin beans from
              Ethiopia&apos;s Yirgacheffe highlands and Yemen&apos;s ancient Haraz mountains,
              roasted in small batches to bring out every terroir note.
            </p>
            <p className="mt-4 font-sans text-base leading-[1.8] text-charcoal/65 max-w-[44ch]">
              We&apos;re building a home for the discerning cup: espresso bar, pour-over station,
              and filter program for those who know the difference, and those ready to discover it.
            </p>

            {/* Animated stats */}
            <motion.div
              ref={statsRef}
              variants={staggerContainer}
              initial="visible"
              animate={statsControls}
              className="mt-12 grid grid-cols-3 gap-6 border-t border-charcoal/10 pt-8"
            >
              {stats.map((stat) => (
                <motion.div key={stat.label} variants={floatUp}>
                  <p className="font-display font-bold text-4xl text-espresso">
                    <Counter target={stat.target} suffix={stat.suffix} />
                  </p>
                  <p className="font-sans text-xs text-charcoal/40 uppercase tracking-wider mt-1">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right column — image */}
          <motion.div
            ref={rightRef}
            variants={scaleIn}
            initial="visible"
            animate={rightControls}
          >
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80"
                alt="Coffee beans"
                fill
                unoptimized
                className="object-cover transition-all duration-700"
                style={{ filter: 'sepia(0.55) saturate(0.7) brightness(0.9) hue-rotate(-10deg)' }}
              />
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="font-sans text-xs text-charcoal/40">Single origin. Always.</span>
              <span className="font-sans text-xs text-charcoal/25 uppercase tracking-widest">Est. 2026</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
