'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { fadeUp, staggerContainer, scaleIn } from '@/lib/animations'

const hoursData = [
  { day: 'Monday – Friday', time: '—' },
  { day: 'Saturday', time: '—' },
  { day: 'Sunday', time: '—' },
]

const tags = ['Specialty Coffee', 'Opening Soon', 'Qatar']

export default function Hours() {
  const sectionRef = useRef<HTMLElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)

  const sectionInView = useInView(sectionRef, { once: true, margin: '-60px' })
  const leftInView = useInView(leftRef, { once: true, margin: '-60px' })
  const rightInView = useInView(rightRef, { once: true, margin: '-60px' })
  const headlineInView = useInView(headlineRef, { once: true, margin: '-60px' })

  return (
    <section
      ref={sectionRef}
      className="bg-cream py-24 md:py-32 px-6 md:px-12"
    >
      {/* Section header */}
      <motion.div
        className="max-w-7xl mx-auto flex items-center gap-6 mb-20"
        initial={{ opacity: 0, y: 12 }}
        animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <span className="font-sans text-xs uppercase tracking-[0.2em] text-charcoal/30 whitespace-nowrap">
          Visit
        </span>
        <div className="flex-1 h-px bg-charcoal/10" />
      </motion.div>

      {/* Main grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

        {/* LEFT COLUMN */}
        <motion.div
          ref={leftRef}
          variants={staggerContainer}
          initial="hidden"
          animate={leftInView ? 'visible' : 'hidden'}
        >
          {/* Headline — per-line overflow-hidden slide up */}
          <div ref={headlineRef} className="overflow-hidden">
            <motion.div variants={fadeUp}>
              <h2 className="font-display font-bold leading-[1.05] tracking-tight text-espresso"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
              >
                Find us in
              </h2>
            </motion.div>
            <div className="overflow-hidden">
              <motion.div variants={fadeUp}>
                <h2 className="font-display font-bold leading-[1.05] tracking-tight text-espresso"
                  style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
                >
                  Doha.
                </h2>
              </motion.div>
            </div>
          </div>

          {/* Address block */}
          <motion.div variants={fadeUp} className="mt-8 space-y-2">
            <p className="font-sans text-base text-charcoal/60">Doha, State of Qatar</p>
            <p className="font-sans text-base text-charcoal/60">@wellbean.qa</p>
            <p className="font-sans text-base text-charcoal/60">wellbean.qa</p>
          </motion.div>

          {/* Opening badge */}
          <motion.div variants={fadeUp} className="mt-8">
            <span className="inline-flex items-center gap-3 bg-espresso text-cream rounded-full px-6 py-3">
              <span className="w-2 h-2 rounded-full bg-brown animate-pulse" />
              <span className="font-display font-semibold text-sm">Opening Soon</span>
            </span>
          </motion.div>

          {/* Hours table */}
          <motion.div variants={fadeUp} className="mt-12 border-t border-charcoal/10 pt-8">
            <p className="font-sans text-xs uppercase tracking-[0.2em] text-charcoal/30 mb-6">
              Hours
            </p>

            <div className="relative">
              {/* Rows */}
              <div className="space-y-0">
                {hoursData.map((row) => (
                  <div
                    key={row.day}
                    className="flex justify-between items-center py-4 border-b border-charcoal/[0.08]"
                  >
                    <span className="font-display font-medium text-sm text-charcoal">
                      {row.day}
                    </span>
                    <span className="font-sans text-sm text-charcoal/40">{row.time}</span>
                  </div>
                ))}
              </div>

              {/* Frosted "Coming Soon" overlay */}
              <div className="absolute inset-0 backdrop-blur-[3px] bg-cream/60 flex items-center justify-center rounded-lg">
                <span className="font-display font-bold text-sm text-espresso/50 uppercase tracking-widest">
                  Hours Coming Soon
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN — image card */}
        <motion.div
          ref={rightRef}
          variants={scaleIn}
          initial="hidden"
          animate={rightInView ? 'visible' : 'hidden'}
          className="relative rounded-3xl overflow-hidden aspect-[4/5]"
        >
          <Image
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80"
            alt="WellBean café in Doha"
            fill
            className="object-cover"
            unoptimized
          />

          {/* Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-espresso/90 via-espresso/40 to-transparent">
            <p className="font-display font-bold text-xl text-cream">WellBean</p>
            <p className="font-sans text-sm text-cream/60 mt-1">Doha, State of Qatar</p>

            <div className="flex flex-wrap gap-2 mt-4">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-cream/20 px-3 py-1 font-sans text-[10px] text-cream/60 uppercase tracking-wider"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
