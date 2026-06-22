'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin } from '@phosphor-icons/react'
import { fadeUp, staggerContainer, scaleIn } from '@/lib/animations'

const DAYS = [
  { day: 'Monday – Friday', time: '—' },
  { day: 'Saturday – Sunday', time: '—' },
]

export default function Hours() {
  const sectionRef = useRef<HTMLElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)

  const leftInView = useInView(leftRef, { once: true, margin: '-80px' })
  const rightInView = useInView(rightRef, { once: true, margin: '-80px' })

  return (
    <section
      id="hours"
      ref={sectionRef}
      className="relative bg-linen py-32 md:py-40 px-8 md:px-16 lg:px-24 overflow-hidden"
    >
      {/* Section marker */}
      <span
        aria-hidden="true"
        className="absolute left-6 top-1/2 -translate-y-1/2 -rotate-90 origin-center font-sans text-[9px] uppercase tracking-[0.3em] text-midnight/30 whitespace-nowrap select-none pointer-events-none"
      >
        003 · Visit
      </span>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 max-w-6xl mx-auto">

        {/* ── LEFT COLUMN ── */}
        <motion.div
          ref={leftRef}
          variants={staggerContainer}
          initial="hidden"
          animate={leftInView ? 'visible' : 'hidden'}
        >
          {/* Eyebrow */}
          <motion.p
            variants={fadeUp}
            className="font-sans text-[10px] uppercase tracking-[0.25em] text-espresso"
          >
            Find Us
          </motion.p>

          {/* Headline */}
          <motion.div variants={staggerContainer} className="mt-4">
            {['Doha,', 'Qatar.'].map((line) => (
              <div key={line} className="overflow-hidden">
                <motion.h2
                  variants={fadeUp}
                  className="font-serif text-[clamp(3rem,6vw,5.5rem)] font-light leading-[0.95] tracking-tight text-midnight"
                >
                  {line}
                </motion.h2>
              </div>
            ))}
          </motion.div>

          {/* Coming soon badge */}
          <motion.div variants={fadeUp} className="mt-8">
            <div className="inline-flex items-center gap-2.5 rounded-full bg-espresso/8 border border-espresso/15 px-5 py-2.5">
              <span className="w-2 h-2 rounded-full bg-espresso animate-pulse" />
              <span className="font-sans text-xs uppercase tracking-[0.2em] text-espresso">
                Opening Soon
              </span>
            </div>
          </motion.div>

          {/* Address block */}
          <motion.address
            variants={fadeUp}
            className="not-italic mt-10 font-sans text-sm text-midnight/60 leading-[2] flex flex-col"
          >
            {['Doha, State of Qatar', '@wellbean.qa', 'wellbean.qa'].map((line) => (
              <span
                key={line}
                className="hover:text-espresso transition-colors duration-300 cursor-default"
              >
                {line}
              </span>
            ))}
          </motion.address>

          {/* Hours preview */}
          <motion.div
            variants={fadeUp}
            className="mt-12 border-t border-espresso/10 pt-8"
          >
            <p className="font-serif italic text-xl text-midnight/60">
              Hours, coming soon
            </p>

            {/* Frosted hours grid */}
            <div className="relative mt-6">
              <div className="grid gap-0">
                {DAYS.map(({ day, time }) => (
                  <div
                    key={day}
                    className="flex justify-between py-3 border-b border-espresso/8 font-sans text-sm text-midnight/40"
                  >
                    <span>{day}</span>
                    <span
                      className="text-midnight/25"
                      style={{ filter: 'blur(3px)' }}
                    >
                      {time}
                    </span>
                  </div>
                ))}
              </div>

              {/* Frosted overlay */}
              <div className="absolute inset-0 backdrop-blur-[2px] flex items-center justify-center">
                <p className="font-serif italic text-2xl text-espresso/60 select-none">
                  Stay tuned
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ── RIGHT COLUMN — Map card ── */}
        <motion.div
          ref={rightRef}
          variants={scaleIn}
          initial="hidden"
          animate={rightInView ? 'visible' : 'hidden'}
          className="flex items-start justify-center lg:justify-end"
        >
          {/* Double-Bezel outer shell */}
          <div className="w-full max-w-sm rounded-[2rem] p-2 ring-1 ring-espresso/10 bg-espresso/5">
            {/* Inner core */}
            <div
              className="rounded-[calc(2rem-0.5rem)] overflow-hidden relative"
              style={{ aspectRatio: '4/5' }}
            >
              {/* Topographic grid background */}
              <div
                className="absolute inset-0 bg-midnight/5"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(61,31,13,0.06) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(61,31,13,0.06) 1px, transparent 1px)
                  `,
                  backgroundSize: '40px 40px',
                }}
              />

              {/* Centered pin + pulsing rings */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative flex items-center justify-center">
                  {/* Outer ping ring */}
                  <span
                    className="absolute w-24 h-24 rounded-full bg-espresso/10 animate-ping"
                    style={{ animationDuration: '2.5s' }}
                  />
                  {/* Inner ping ring */}
                  <span
                    className="absolute w-16 h-16 rounded-full bg-espresso/20 animate-ping"
                    style={{ animationDuration: '2s', animationDelay: '0.3s' }}
                  />
                  {/* Center pin */}
                  <div className="relative w-12 h-12 rounded-full bg-espresso flex items-center justify-center shadow-lg z-10">
                    <MapPin weight="fill" className="text-linen w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Bottom label card */}
              <div className="absolute bottom-4 left-4 right-4 bg-linen/90 backdrop-blur-sm rounded-xl p-4 ring-1 ring-espresso/10">
                <p className="font-serif text-lg font-medium text-midnight">
                  WellBean
                </p>
                <p className="font-sans text-xs text-midnight/50 mt-1">
                  Doha, State of Qatar
                </p>
                <p className="font-sans text-[10px] uppercase tracking-[0.15em] text-espresso mt-2">
                  Opening Soon
                </p>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
