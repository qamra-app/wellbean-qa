'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  InstagramLogo,
  WhatsappLogo,
  EnvelopeSimple,
  ArrowRight,
} from '@phosphor-icons/react'
import { fadeUp, staggerContainer, slideInLeft } from '@/lib/animations'

interface Channel {
  Icon: React.ElementType
  label: string
  href: string
}

const CHANNELS: Channel[] = [
  {
    Icon: InstagramLogo,
    label: '@wellbean.qa',
    href: 'https://instagram.com/wellbean.qa',
  },
  {
    Icon: WhatsappLogo,
    label: 'Chat with us on WhatsApp',
    href: '#',
  },
  {
    Icon: EnvelopeSimple,
    label: 'hello@wellbean.qa',
    href: 'mailto:hello@wellbean.qa',
  },
]

const checkVariant = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 80, damping: 20 },
  },
}

const successTextVariant = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 80, damping: 20, delay: 0.2 },
  },
}

export default function Contact() {
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)

  const leftInView = useInView(leftRef, { once: true, margin: '-80px' })
  const rightInView = useInView(rightRef, { once: true, margin: '-80px' })

  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section
      id="contact"
      className="relative bg-offwhite py-32 md:py-40 px-8 md:px-16 lg:px-24 overflow-hidden"
    >
      {/* Section marker */}
      <span
        aria-hidden="true"
        className="absolute left-6 top-1/2 -translate-y-1/2 -rotate-90 origin-center font-sans text-[9px] uppercase tracking-[0.3em] text-midnight/30 whitespace-nowrap select-none pointer-events-none"
      >
        004 · Contact
      </span>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">

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
            Say Hello
          </motion.p>

          {/* Headline */}
          <motion.h2
            variants={fadeUp}
            className="font-serif text-[clamp(2.5rem,5vw,4rem)] font-light leading-tight text-midnight mt-4"
          >
            We&rsquo;d love to
            <br />
            hear from you.
          </motion.h2>

          {/* Body */}
          <motion.p
            variants={fadeUp}
            className="font-sans text-sm text-midnight/60 leading-[1.9] mt-6 max-w-[38ch]"
          >
            Whether you want to collaborate, ask about our opening, or simply
            say hello — our door (and DMs) are always open.
          </motion.p>

          {/* Contact channels */}
          <motion.div
            variants={staggerContainer}
            className="mt-10 flex flex-col gap-4"
          >
            {CHANNELS.map(({ Icon, label, href }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                variants={fadeUp}
                className="flex items-center gap-4 group"
              >
                <div className="w-10 h-10 rounded-full border border-espresso/20 flex items-center justify-center group-hover:bg-espresso group-hover:border-espresso transition-all duration-500 shrink-0">
                  <Icon
                    size={18}
                    weight="regular"
                    className="text-espresso group-hover:text-linen transition-colors duration-500"
                  />
                </div>
                <span className="font-sans text-sm text-midnight/70 group-hover:text-espresso transition-colors duration-300">
                  {label}
                </span>
              </motion.a>
            ))}
          </motion.div>

          {/* Decorative quote */}
          <motion.blockquote
            variants={fadeUp}
            className="mt-16 font-serif italic text-3xl font-light text-espresso/30 leading-tight"
          >
            &ldquo;Fill your cup,
            <br />
            feel your cup.&rdquo;
          </motion.blockquote>
        </motion.div>

        {/* ── RIGHT COLUMN — Form card ── */}
        <motion.div
          ref={rightRef}
          variants={slideInLeft}
          initial="hidden"
          animate={rightInView ? 'visible' : 'hidden'}
        >
          {/* Double-Bezel outer shell */}
          <div className="rounded-[2rem] p-2 ring-1 ring-espresso/10 bg-espresso/5">
            {/* Inner core */}
            <div className="rounded-[calc(2rem-0.5rem)] bg-linen p-8 md:p-10">

              <AnimatePresence mode="wait">
                {!submitted ? (
                  /* ── FORM STATE ── */
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -16, transition: { duration: 0.3 } }}
                    className="group-form"
                  >
                    {/* Name */}
                    <div className="flex flex-col gap-2 mb-6">
                      <label className="font-sans text-[10px] uppercase tracking-[0.2em] text-midnight/50">
                        Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Your name"
                        className="w-full bg-transparent border-b border-espresso/20 py-3 font-sans text-sm text-midnight placeholder:text-midnight/25 focus:outline-none focus:border-espresso transition-colors duration-300"
                      />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-2 mb-6">
                      <label className="font-sans text-[10px] uppercase tracking-[0.2em] text-midnight/50">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="your@email.com"
                        className="w-full bg-transparent border-b border-espresso/20 py-3 font-sans text-sm text-midnight placeholder:text-midnight/25 focus:outline-none focus:border-espresso transition-colors duration-300"
                      />
                    </div>

                    {/* Subject */}
                    <div className="flex flex-col gap-2 mb-6">
                      <label className="font-sans text-[10px] uppercase tracking-[0.2em] text-midnight/50">
                        Subject
                      </label>
                      <input
                        type="text"
                        placeholder="What's on your mind?"
                        className="w-full bg-transparent border-b border-espresso/20 py-3 font-sans text-sm text-midnight placeholder:text-midnight/25 focus:outline-none focus:border-espresso transition-colors duration-300"
                      />
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-2 mb-6">
                      <label className="font-sans text-[10px] uppercase tracking-[0.2em] text-midnight/50">
                        Message
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Tell us more..."
                        className="w-full bg-transparent border-b border-espresso/20 py-3 font-sans text-sm text-midnight placeholder:text-midnight/25 focus:outline-none focus:border-espresso transition-colors duration-300 resize-none"
                      />
                    </div>

                    {/* Submit button */}
                    <button
                      type="submit"
                      className="group mt-8 w-full rounded-full bg-espresso text-linen font-sans text-sm px-8 py-4 flex items-center justify-center gap-3 hover:bg-midnight transition-colors duration-500 active:scale-[0.98]"
                    >
                      <span>Send Message</span>
                      <span className="w-7 h-7 rounded-full bg-linen/10 flex items-center justify-center">
                        <ArrowRight
                          size={14}
                          weight="bold"
                          className="group-hover:translate-x-1 transition-transform duration-300"
                        />
                      </span>
                    </button>
                  </motion.form>
                ) : (
                  /* ── SUCCESS STATE ── */
                  <motion.div
                    key="success"
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col items-center justify-center py-16 text-center gap-6"
                  >
                    {/* Animated checkmark circle */}
                    <motion.div
                      variants={checkVariant}
                      className="w-16 h-16 rounded-full bg-espresso flex items-center justify-center"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-7 h-7 text-linen"
                        aria-hidden="true"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </motion.div>

                    <motion.p
                      variants={successTextVariant}
                      className="font-serif italic text-2xl text-midnight leading-snug max-w-[28ch]"
                    >
                      Message received. We&rsquo;ll be in touch soon.
                    </motion.p>

                    <motion.button
                      variants={successTextVariant}
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="font-sans text-xs uppercase tracking-[0.2em] text-midnight/40 hover:text-espresso transition-colors duration-300 mt-2"
                    >
                      Send another
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
