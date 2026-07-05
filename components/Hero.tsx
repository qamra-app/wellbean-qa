'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Image from 'next/image'
import { ArrowRight } from '@phosphor-icons/react'
import { staggerContainer, fadeUp } from '@/lib/animations'

function SteamEffect() {
  return (
    <div
      className="pointer-events-none absolute"
      style={{
        bottom: '52%',
        right: 'calc(20% - 60px)',
        width: 120,
        height: 160,
      }}
      aria-hidden="true"
    >
      <svg
        width="120"
        height="160"
        viewBox="0 0 120 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Wisp 1 — left strand */}
        <path
          className="steam-wisp"
          d="M25 155 C15 135 35 120 20 100 C5 80 25 65 18 45"
        />
        {/* Wisp 2 — center-left strand */}
        <path
          className="steam-wisp"
          d="M50 155 C60 132 38 118 52 96 C66 74 44 60 55 38"
        />
        {/* Wisp 3 — center-right strand */}
        <path
          className="steam-wisp"
          d="M75 155 C65 130 85 115 70 93 C55 71 75 56 65 34"
        />
        {/* Wisp 4 — right strand, thinner */}
        <path
          className="steam-wisp"
          style={{ strokeWidth: 1.5, stroke: 'rgba(255,248,240,0.2)' }}
          d="M100 155 C110 133 92 118 105 96 C118 74 100 59 108 37"
        />
      </svg>
    </div>
  )
}

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
  // Mouse parallax setup
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { stiffness: 40, damping: 25, mass: 1 }
  const smoothMouseX = useSpring(mouseX, springConfig)
  const smoothMouseY = useSpring(mouseY, springConfig)

  // Different depth layers
  const bgX = useTransform(smoothMouseX, [-0.5, 0.5], ['3%', '-3%'])
  const bgY = useTransform(smoothMouseY, [-0.5, 0.5], ['3%', '-3%'])

  const logoX = useTransform(smoothMouseX, [-0.5, 0.5], ['-12px', '12px'])
  const logoY = useTransform(smoothMouseY, [-0.5, 0.5], ['-10px', '10px'])

  const textX = useTransform(smoothMouseX, [-0.5, 0.5], ['-4px', '4px'])
  const textY = useTransform(smoothMouseY, [-0.5, 0.5], ['-3px', '3px'])

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  function handleMouseLeave() {
    mouseX.set(0)
    mouseY.set(0)
  }

  function handleTouchMove(e: React.TouchEvent<HTMLElement>) {
    const touch = e.touches[0]
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set((touch.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((touch.clientY - rect.top) / rect.height - 0.5)
  }

  function handleTouchEnd() {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.section
      className="relative min-h-[100dvh] overflow-hidden bg-espresso flex flex-col"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background image — moves the most (far layer) */}
      <motion.div
        className="absolute inset-0 z-0 scale-110"
        style={{ x: bgX, y: bgY }}
      >
        <Image
          src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1920&q=80"
          alt="Coffee"
          fill
          unoptimized
          className="object-cover opacity-30 mix-blend-luminosity"
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[100dvh] text-center px-6 w-full">
        {/* Steam effect — medium depth layer */}
        <motion.div
          className="hidden md:block"
          style={{ x: logoX, y: logoY }}
        >
          <SteamEffect />
        </motion.div>

        {/* Text content — moves the least (close layer) */}
        <motion.div
          className="max-w-5xl mx-auto w-full flex flex-col items-center"
          style={{ x: textX, y: textY }}
        >
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
        </motion.div>
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
    </motion.section>
  )
}
