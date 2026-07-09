'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function RitualVideo() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-15%' })

  return (
    <section
      className="relative bg-espresso overflow-hidden"
      style={{ minHeight: 'clamp(420px, 65vw, 760px)' }}
    >
      {/* Video — full bleed, motion graphic treatment */}
      <div ref={ref} className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'saturate(0.85) brightness(0.72)' }}
        >
          <source src="/coffee-ritual.mp4" type="video/mp4" />
        </video>

        {/* Gradient vignette — keeps text readable, pulls edges into espresso */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to right, rgba(28,10,2,0.82) 0%, rgba(28,10,2,0.35) 50%, rgba(28,10,2,0.72) 100%), linear-gradient(to top, rgba(28,10,2,0.6) 0%, transparent 40%)',
          }}
        />
      </div>

      {/* Text layer */}
      <div className="relative z-10 flex flex-col justify-end h-full max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24"
        style={{ minHeight: 'clamp(420px, 65vw, 760px)' }}>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Eyebrow */}
          <p className="font-sans text-[11px] uppercase tracking-[0.22em] text-cream/50 mb-4">
            The craft
          </p>

          {/* Headline */}
          <h2
            className="font-display font-bold text-cream leading-[1.0] tracking-tight"
            style={{ fontSize: 'clamp(2.8rem, 7vw, 6.5rem)' }}
          >
            Every pour,<br />
            intentional.
          </h2>

          {/* Body */}
          <p className="mt-5 font-sans text-cream/60 leading-[1.75]"
            style={{ maxWidth: '38ch', fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)' }}>
            From the single-origin harvest to the moment it lands in your cup —
            nothing here is accidental.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
