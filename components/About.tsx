'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { ArrowUpRight } from '@phosphor-icons/react'
import { slideInLeft, scaleIn } from '@/lib/animations'

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

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)

  const leftInView = useInView(leftRef, { once: true, margin: '-60px' })
  const rightInView = useInView(rightRef, { once: true, margin: '-60px' })
  const headlineInView = useInView(sectionRef, { once: true, margin: '-60px' })

  return (
    <section
      id="about"
      ref={sectionRef}
      className="bg-warm-white py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section header */}
        <div className="flex items-center gap-6 mb-20">
          <span className="font-sans text-xs uppercase tracking-[0.2em] text-charcoal/30">
            02 / About
          </span>
          <div className="flex-1 h-px bg-charcoal/10" />
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left column */}
          <motion.div
            ref={leftRef}
            variants={slideInLeft}
            initial="hidden"
            animate={leftInView ? 'visible' : 'hidden'}
          >
            {/* Headline with per-line slide-up */}
            <div>
              {headlineLines.map((line, i) => (
                <div key={line} className="overflow-hidden">
                  <motion.h2
                    custom={i}
                    variants={lineReveal}
                    initial="hidden"
                    animate={headlineInView ? 'visible' : 'hidden'}
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
              WellBean is more than coffee. It&apos;s the first sip of a good morning,
              the pause in a busy afternoon, the ritual that grounds your day.
            </p>
            <p className="mt-4 font-sans text-base leading-[1.8] text-charcoal/65 max-w-[44ch]">
              We source specialty-grade beans from single origins, roast them
              to peak expression, and brew them with the care they deserve.
            </p>

            {/* Stats row */}
            <div className="mt-12 grid grid-cols-2 gap-6 border-t border-charcoal/10 pt-8">
              {[
                { number: '2025', label: 'Founded' },
                { number: 'Qatar', label: 'Home' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-display font-bold text-2xl text-espresso">
                    {stat.number}
                  </p>
                  <p className="font-sans text-xs text-charcoal/40 uppercase tracking-wider mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right column — image */}
          <motion.div
            ref={rightRef}
            variants={scaleIn}
            initial="hidden"
            animate={rightInView ? 'visible' : 'hidden'}
          >
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
              <Image
                src="https://picsum.photos/seed/coffeebeans/800/1000"
                alt="Coffee beans"
                fill
                unoptimized
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="font-sans text-xs text-charcoal/40">
                Single origin. Always.
              </span>
              <ArrowUpRight size={16} className="text-charcoal/30" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
