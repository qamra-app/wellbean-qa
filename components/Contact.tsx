'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  InstagramLogo,
  WhatsappLogo,
  EnvelopeSimple,
  ArrowRight,
  CheckCircle,
} from '@phosphor-icons/react'
import { fadeUp, staggerContainer, slideInLeft, scaleIn } from '@/lib/animations'

interface Channel {
  icon: React.ReactNode
  name: string
  handle: string
  href?: string
}

const channels: Channel[] = [
  {
    icon: <InstagramLogo size={18} className="text-espresso group-hover:text-cream transition-colors duration-300" />,
    name: 'Instagram',
    handle: '@wellbean.qa',
    href: 'https://instagram.com/wellbean.qa',
  },
  {
    icon: <WhatsappLogo size={18} className="text-espresso group-hover:text-cream transition-colors duration-300" />,
    name: 'WhatsApp',
    handle: 'Chat with us directly',
  },
  {
    icon: <EnvelopeSimple size={18} className="text-espresso group-hover:text-cream transition-colors duration-300" />,
    name: 'Email',
    handle: 'hello@wellbean.qa',
    href: 'mailto:hello@wellbean.qa',
  },
]

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)

  const sectionRef = useRef<HTMLElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)

  const sectionInView = useInView(sectionRef, { once: true, margin: '-60px' })
  const leftInView = useInView(leftRef, { once: true, margin: '-60px' })
  const rightInView = useInView(rightRef, { once: true, margin: '-60px' })

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section
      ref={sectionRef}
      className="bg-warm-white py-24 md:py-32 px-6 md:px-12"
    >
      {/* Section header */}
      <motion.div
        className="max-w-7xl mx-auto flex items-center gap-6 mb-20"
        initial={{ opacity: 0, y: 12 }}
        animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <span className="font-sans text-xs uppercase tracking-[0.2em] text-charcoal/30 whitespace-nowrap">
          04 / Contact
        </span>
        <div className="flex-1 h-px bg-charcoal/10" />
      </motion.div>

      {/* Main grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

        {/* LEFT COLUMN */}
        <motion.div
          ref={leftRef}
          variants={slideInLeft}
          initial="hidden"
          animate={leftInView ? 'visible' : 'hidden'}
        >
          {/* Headline */}
          <h2
            className="font-display font-bold leading-[1.05] tracking-tight text-espresso"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
          >
            {"Let's talk"}
            <br />
            coffee.
          </h2>

          {/* Subtext */}
          <p className="mt-6 font-sans text-base text-charcoal/60 max-w-[38ch] leading-relaxed">
            Got questions about our opening, want to collaborate, or just want to say hello?
            We&apos;re all ears.
          </p>

          {/* Contact channels */}
          <div className="mt-12 space-y-4">
            {channels.map((channel) => {
              const inner = (
                <div className="group flex items-center gap-4 py-4 border-b border-charcoal/[0.08] cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-espresso/[0.06] flex items-center justify-center group-hover:bg-espresso transition-colors duration-300 shrink-0">
                    {channel.icon}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-display font-semibold text-sm text-charcoal">
                      {channel.name}
                    </span>
                    <span className="font-sans text-xs text-charcoal/40">{channel.handle}</span>
                  </div>
                </div>
              )

              return channel.href ? (
                <a key={channel.name} href={channel.href} target="_blank" rel="noopener noreferrer" className="block">
                  {inner}
                </a>
              ) : (
                <div key={channel.name}>{inner}</div>
              )
            })}
          </div>
        </motion.div>

        {/* RIGHT COLUMN — contact form */}
        <motion.div
          ref={rightRef}
          variants={fadeUp}
          initial="hidden"
          animate={rightInView ? 'visible' : 'hidden'}
          className="bg-white rounded-3xl p-8 md:p-10 shadow-[0_2px_40px_-8px_rgba(28,10,2,0.08)]"
        >
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: 'easeIn' }}
              >
                {/* Name */}
                <div className="mb-6">
                  <label className="block font-sans text-xs uppercase tracking-[0.15em] text-charcoal/40 mb-3">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    required
                    className="w-full bg-cream/50 rounded-xl px-4 py-3.5 font-sans text-sm text-charcoal placeholder:text-charcoal/25 border border-transparent focus:border-espresso/20 focus:bg-cream focus:outline-none transition-all duration-200"
                  />
                </div>

                {/* Email */}
                <div className="mb-6">
                  <label className="block font-sans text-xs uppercase tracking-[0.15em] text-charcoal/40 mb-3">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    required
                    className="w-full bg-cream/50 rounded-xl px-4 py-3.5 font-sans text-sm text-charcoal placeholder:text-charcoal/25 border border-transparent focus:border-espresso/20 focus:bg-cream focus:outline-none transition-all duration-200"
                  />
                </div>

                {/* Message */}
                <div className="mb-6">
                  <label className="block font-sans text-xs uppercase tracking-[0.15em] text-charcoal/40 mb-3">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    placeholder="What's on your mind?"
                    required
                    className="w-full bg-cream/50 rounded-xl px-4 py-3.5 font-sans text-sm text-charcoal placeholder:text-charcoal/25 border border-transparent focus:border-espresso/20 focus:bg-cream focus:outline-none transition-all duration-200 resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="group w-full mt-2 rounded-xl bg-espresso text-cream font-display font-bold text-sm py-4 px-8 flex items-center justify-center gap-3 hover:bg-brown transition-colors duration-300 active:scale-[0.98]"
                >
                  Send Message
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform duration-200"
                  />
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                variants={scaleIn}
                initial="hidden"
                animate="visible"
                className="flex flex-col items-center justify-center py-16 text-center"
              >
                <CheckCircle
                  size={48}
                  weight="fill"
                  className="text-espresso mb-4"
                />
                <p className="font-display font-bold text-xl text-espresso">Message Sent!</p>
                <p className="font-sans text-sm text-charcoal/50 mt-2">
                  We&apos;ll get back to you soon.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  )
}
