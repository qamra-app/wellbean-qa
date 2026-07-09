'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { staggerContainer, slideRight, scaleIn, headerReveal, useReveal } from '@/lib/animations'

const hoursData = [
  { day: 'Sun – Thu', time: '—' },
]

const tags = ['Specialty Coffee', 'Opening 2026', 'Vendôme Mall']

const marqueeItems = [
  'Single Origin',
  '84+ SCA Score',
  'Small Batch',
  'Ethiopia Yirgacheffe',
  'Yemen Haraz',
  'Colombia Huila',
  'Craft Roasted',
  'Traced to Source',
  'Opening 2026',
  'Vendôme Mall',
]

export default function Hours() {
  const sectionRef = useRef<HTMLElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)

  const sectionControls = useReveal(sectionRef, { once: false, margin: '-60px' })
  const leftControls = useReveal(leftRef, { once: false, margin: '-60px' })
  const rightControls = useReveal(rightRef, { once: false, margin: '-60px' })

  return (
    <section
      id="visit"
      ref={sectionRef}
      className="bg-cream py-0"
    >
      {/* Marquee strip */}
      <div className="overflow-hidden border-b border-charcoal/[0.07] py-4">
        <div className="flex animate-marquee gap-0 whitespace-nowrap">
          {[0, 1].map((rep) => (
            <div key={rep} className="flex shrink-0">
              {marqueeItems.map((item) => (
                <span key={`${rep}-${item}`} className="font-sans text-[10px] uppercase tracking-[0.25em] text-charcoal/30 px-6">
                  {item} <span className="text-charcoal/15">·</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="py-24 md:py-32 px-6 md:px-12">
        {/* Section header */}
        <motion.div
          className="max-w-7xl mx-auto flex items-center gap-6 mb-20"
          variants={headerReveal}
          initial="visible"
          animate={sectionControls}
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
            initial="visible"
            animate={leftControls}
          >
            {/* Headline */}
            <div>
              {['Find us at', 'Vendôme Mall.'].map((line) => (
                <div key={line} className="overflow-hidden">
                  <motion.div variants={slideRight}>
                    <h2
                      className="font-display font-bold leading-[1.05] tracking-tight text-espresso"
                      style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
                    >
                      {line}
                    </h2>
                  </motion.div>
                </div>
              ))}
            </div>

            {/* One-liner */}
            <motion.p variants={slideRight} className="mt-6 font-sans text-base leading-[1.8] text-charcoal/55 max-w-[36ch]">
              A quiet corner for the unhurried cup. Coming soon to Vendôme Mall, Lusail.
            </motion.p>

            {/* Address block */}
            <motion.div variants={slideRight} className="mt-8 space-y-1">
              <p className="font-sans text-sm text-charcoal/50">Vendôme Mall, Lusail, Qatar</p>
              <p className="font-sans text-sm text-charcoal/50">@wellbean.qa</p>
              <p className="font-sans text-sm text-charcoal/50">wellbean.qa</p>
            </motion.div>

            {/* Opening badge */}
            <motion.div variants={slideRight} className="mt-8">
              <span className="inline-flex items-center gap-3 bg-espresso text-cream rounded-full px-6 py-3">
                <span className="w-2 h-2 rounded-full bg-brown animate-pulse" />
                <span className="font-display font-semibold text-sm">Opening 2026</span>
              </span>
            </motion.div>

            {/* Hours table */}
            <motion.div variants={slideRight} className="mt-12 border-t border-charcoal/10 pt-8">
              <p className="font-sans text-xs uppercase tracking-[0.2em] text-charcoal/30 mb-6">
                Hours
              </p>

              <div className="relative">
                <div className="space-y-0">
                  {hoursData.map((row) => (
                    <div
                      key={row.day}
                      className="flex justify-between items-center py-4 border-b border-charcoal/[0.08]"
                    >
                      <span className="font-display font-medium text-sm text-charcoal">{row.day}</span>
                      <span className="font-sans text-sm text-charcoal/40">{row.time}</span>
                    </div>
                  ))}
                </div>

                {/* Frosted overlay */}
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
            initial="visible"
            animate={rightControls}
            className="relative rounded-3xl overflow-hidden aspect-[4/5]"
          >
            <Image
              src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80"
              alt="WellBean café at Vendôme Mall, Lusail"
              fill
              className="object-cover"
              unoptimized
              style={{ filter: 'sepia(0.55) saturate(0.7) brightness(0.9) hue-rotate(-10deg)' }}
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-espresso/90 via-espresso/40 to-transparent">
              <p className="font-display font-bold text-xl text-cream">WellBean</p>
              <p className="font-sans text-sm text-cream/60 mt-1">Vendôme Mall · Lusail, Qatar</p>
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
      </div>
    </section>
  )
}
