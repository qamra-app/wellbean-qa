'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ArrowRight } from '@phosphor-icons/react'
import { staggerContainer, fadeUp } from '@/lib/animations'

const words = ['Well', 'Bean.']

const wordReveal = {
  hidden: { y: '110%' },
  visible: (i: number) => ({
    y: '0%',
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 18,
      delay: 0.3 + i * 0.15,
    },
  }),
}

const stats = [
  { label: 'Specialty Grade', value: '84+ SCA Score' },
  { label: 'Single Origin', value: 'Traced to source' },
  { label: 'Craft Roasted', value: 'Small batch' },
]

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] overflow-hidden bg-espresso flex flex-col">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://picsum.photos/seed/coffeehero/1920/1080"
          alt="Coffee"
          fill
          unoptimized
          className="object-cover opacity-30 mix-blend-luminosity"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[100dvh] text-center px-6 w-full">
        <div className="max-w-5xl mx-auto w-full flex flex-col items-center">
          {/* Eyebrow tag */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 rounded-full border border-cream/20 px-4 py-1.5 mb-8"
          >
            <span className="animate-pulse w-1.5 h-1.5 rounded-full bg-brown block" />
            <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-cream/60">
              Specialty Coffee · Opening Soon in Qatar
            </span>
          </motion.div>

          {/* Headline — per-word slide-up */}
          <div className="flex flex-col items-center gap-0">
            {words.map((word, i) => (
              <div key={word} className="overflow-hidden">
                <motion.h1
                  custom={i}
                  variants={wordReveal}
                  initial="hidden"
                  animate="visible"
                  className="font-display font-bold text-cream leading-[0.9] tracking-tight"
                  style={{ fontSize: 'clamp(4rem, 14vw, 12rem)' }}
                >
                  {word}
                </motion.h1>
              </div>
            ))}
          </div>

          {/* Tagline */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.75 }}
            className="font-sans text-cream/60 text-lg md:text-xl font-light tracking-wide mt-8"
          >
            Your daily dose of well-bean-ing
          </motion.p>

          {/* CTA row */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex items-center gap-4 mt-12"
            style={{ transitionDelay: '0.9s' }}
          >
            <motion.a
              href="#"
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full bg-cream text-espresso font-display font-bold text-sm px-8 py-4 hover:bg-white transition-colors duration-300 active:scale-[0.97]"
            >
              Coming Soon
              <ArrowRight size={18} weight="bold" />
            </motion.a>
            <motion.span
              variants={fadeUp}
              className="font-sans text-sm text-cream/40 hover:text-cream/70 transition-colors cursor-pointer"
            >
              @wellbean.qa
            </motion.span>
          </motion.div>
        </div>
      </div>

      {/* Bottom stat strip */}
      <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-cream/10">
        <div className="grid grid-cols-3 divide-x divide-cream/10">
          {stats.map((stat) => (
            <div key={stat.label} className="py-5 px-8 flex flex-col gap-1">
              <span className="font-display font-semibold text-cream text-sm">
                {stat.label}
              </span>
              <span className="font-sans text-cream/40 text-xs">{stat.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
