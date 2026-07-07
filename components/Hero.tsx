'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Image from 'next/image'
import { ArrowRight } from '@phosphor-icons/react'
import { staggerContainer, fadeUp, useEntrance } from '@/lib/animations'

function SteamEffect() {
  return (
    <div
      className="pointer-events-none absolute"
      style={{ bottom: '52%', right: 'calc(20% - 60px)', width: 120, height: 160 }}
      aria-hidden="true"
    >
      <svg width="120" height="160" viewBox="0 0 120 160" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path className="steam-wisp" d="M25 155 C15 135 35 120 20 100 C5 80 25 65 18 45" />
        <path className="steam-wisp" d="M50 155 C60 132 38 118 52 96 C66 74 44 60 55 38" />
        <path className="steam-wisp" d="M75 155 C65 130 85 115 70 93 C55 71 75 56 65 34" />
        <path
          className="steam-wisp"
          style={{ strokeWidth: 1.5, stroke: 'rgba(255,248,240,0.2)' }}
          d="M100 155 C110 133 92 118 105 96 C118 74 100 59 108 37"
        />
      </svg>
    </div>
  )
}

function RotatingBadge() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
      className="w-24 h-24"
      aria-hidden="true"
    >
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          id="badge-circle"
          d="M50,6 A44,44 0 1,1 49.99,6"
          fill="none"
        />
        <text>
          <textPath href="#badge-circle" startOffset="0%" className="fill-cream/40 uppercase">
            <tspan style={{ fontSize: '7px', letterSpacing: '0.22em', fontFamily: 'var(--font-dm-sans)' }}>
              WELLBEAN · DOHA · OPENING 2026 · SPECIALTY ·
            </tspan>
          </textPath>
        </text>
        <circle cx="50" cy="50" r="3" fill="rgba(255,248,240,0.3)" />
      </svg>
    </motion.div>
  )
}

function MagneticCTA() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 15 })
  const sy = useSpring(y, { stiffness: 200, damping: 15 })

  function onMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - rect.left - rect.width / 2) * 0.38)
    y.set((e.clientY - rect.top - rect.height / 2) * 0.38)
  }

  function onLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.a
      href="#contact"
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      variants={fadeUp}
      className="inline-flex items-center gap-2 rounded-full bg-cream text-espresso font-display font-bold text-sm px-8 py-4 hover:bg-white transition-colors duration-300 active:scale-[0.97] cursor-pointer"
    >
      Get Notified
      <ArrowRight size={18} weight="bold" />
    </motion.a>
  )
}

const words = ['Well', 'Bean.']

const wordReveal = {
  hidden: { y: '110%' },
  visible: (i: number) => ({
    y: '0%',
    transition: { type: 'spring' as const, stiffness: 100, damping: 18, delay: 0.3 + i * 0.15 },
  }),
}

const stats = [
  { label: 'Specialty Grade', value: '84+ SCA Score' },
  { label: 'Single Origin', value: 'Traced to source' },
  { label: 'Craft Roasted', value: 'Small batch' },
]

const particles = [
  { id: 0,  x: 8,  delay: 0,   duration: 10,  size: 2 },
  { id: 1,  x: 18, delay: 2.4, duration: 8,   size: 1 },
  { id: 2,  x: 31, delay: 0.7, duration: 11,  size: 3 },
  { id: 3,  x: 44, delay: 3.8, duration: 9,   size: 2 },
  { id: 4,  x: 52, delay: 1.2, duration: 12,  size: 1 },
  { id: 5,  x: 60, delay: 5.1, duration: 8.5, size: 4 },
  { id: 6,  x: 68, delay: 0.3, duration: 9.5, size: 2 },
  { id: 7,  x: 75, delay: 2.9, duration: 7.5, size: 1 },
  { id: 8,  x: 82, delay: 4.4, duration: 10,  size: 3 },
  { id: 9,  x: 89, delay: 1.7, duration: 8,   size: 2 },
  { id: 10, x: 94, delay: 3.2, duration: 11,  size: 1 },
  { id: 11, x: 24, delay: 6.0, duration: 9,   size: 2 },
]

const tickerItems = [
  'Single Origin', 'Ethiopia Yirgacheffe', '84+ SCA Score',
  'Yemen Haraz', 'Small Batch', 'Colombia Huila', 'Craft Roasted',
  'Specialty Grade', 'Traced to Source', 'Opening 2026',
]

export default function Hero() {
  const entrance = useEntrance()
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { stiffness: 40, damping: 25, mass: 1 }
  const smoothMouseX = useSpring(mouseX, springConfig)
  const smoothMouseY = useSpring(mouseY, springConfig)

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

  return (
    <motion.section
      className="grain-overlay relative min-h-[100dvh] overflow-hidden bg-espresso flex flex-col"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background image — Ken Burns zoom + parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ x: bgX, y: bgY }}
        initial={{ scale: 1.18 }}
        animate={{ scale: 1.06 }}
        transition={{ duration: 5, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image
          src="https://images.unsplash.com/photo-1459755486867-b55449bb39ff?w=1920&q=80"
          alt="Steam rising from coffee cup"
          fill
          unoptimized
          priority
          className="object-cover opacity-35"
        />
      </motion.div>

      {/* Gradient — darker center for text contrast */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(28,10,2,0.20) 0%, rgba(28,10,2,0.80) 100%)' }}
      />

      {/* Pulsing glow orb */}
      <motion.div
        className="absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none z-[2]"
        style={{ background: 'radial-gradient(circle, rgba(107,58,42,0.18) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.18, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Floating ambient particles */}
      <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-cream"
            style={{ left: `${p.x}%`, bottom: '-6px', width: p.size, height: p.size }}
            animate={{ y: [0, -720], opacity: [0, 0.5, 0.5, 0] }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'linear' }}
          />
        ))}
      </div>

      {/* Rotating badge — bottom right above stat strip */}
      <div className="absolute bottom-20 right-8 md:right-14 z-10 pointer-events-none hidden md:block">
        <RotatingBadge />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[100dvh] text-center px-6 w-full">
        {/* Steam effect — medium depth layer */}
        <motion.div className="hidden md:block" style={{ x: logoX, y: logoY }}>
          <SteamEffect />
        </motion.div>

        {/* Text content — closest layer */}
        <motion.div
          className="max-w-5xl mx-auto w-full flex flex-col items-center"
          style={{ x: textX, y: textY }}
        >
          {/* Eyebrow tag */}
          <motion.div
            variants={fadeUp}
            initial="visible"
            animate={entrance}
            className="inline-flex items-center gap-2 rounded-full border border-cream/20 px-4 py-1.5 mb-8"
          >
            <span className="animate-pulse w-1.5 h-1.5 rounded-full bg-brown block" />
            <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-white/75">
              Specialty Coffee · Opening 2026 · Doha, Qatar
            </span>
          </motion.div>

          {/* Headline */}
          <div className="flex flex-col items-center gap-0">
            {words.map((word, i) => (
              <div key={word} className="overflow-hidden">
                <motion.h1
                  custom={i}
                  variants={wordReveal}
                  initial="visible"
                  animate={entrance}
                  className="font-display font-bold text-white leading-[0.9] tracking-tight"
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
            initial="visible"
            animate={entrance}
            transition={{ delay: 0.75 }}
            className="font-sans text-white/80 text-lg md:text-xl font-light tracking-wide mt-8"
          >
            Your daily dose of well-bean-ing
          </motion.p>

          {/* Opening line — bumped up for legibility */}
          <motion.p
            variants={fadeUp}
            initial="visible"
            animate={entrance}
            transition={{ delay: 0.88 }}
            className="font-sans text-white/45 text-sm tracking-wide mt-2"
          >
            Doha has been waiting for this cup. So have we.
          </motion.p>

          {/* Mini ticker */}
          <motion.div
            variants={fadeUp}
            initial="visible"
            animate={entrance}
            transition={{ delay: 1.0 }}
            className="overflow-hidden w-full max-w-xs mt-6"
          >
            <div className="flex animate-marquee whitespace-nowrap">
              {[0, 1].map((rep) => (
                <div key={rep} className="flex shrink-0">
                  {tickerItems.map((item) => (
                    <span key={`${rep}-${item}`} className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/30 px-3">
                      {item} <span className="text-white/15">·</span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA row */}
          <motion.div
            variants={staggerContainer}
            initial="visible"
            animate={entrance}
            className="flex items-center gap-4 mt-8"
          >
            <MagneticCTA />
            <motion.a
              href="https://instagram.com/wellbean.qa"
              target="_blank"
              rel="noopener noreferrer"
              variants={fadeUp}
              className="font-sans text-sm text-white/60 hover:text-white transition-colors"
            >
              @wellbean.qa
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom stat strip */}
      <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-cream/10">
        <div className="grid grid-cols-3 divide-x divide-cream/10">
          {stats.map((stat) => (
            <div key={stat.label} className="py-4 px-3 md:py-5 md:px-8 flex flex-col gap-1">
              <span className="font-display font-semibold text-white text-[13px] md:text-sm">{stat.label}</span>
              <span className="font-sans text-white/65 text-[11px] md:text-xs">{stat.value}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
