'use client'

import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  InstagramLogo,
  WhatsappLogo,
  EnvelopeSimple,
  ArrowRight,
  CheckCircle,
} from '@phosphor-icons/react'
import { fadeUp, staggerContainer, slideInLeft, scaleIn, headerReveal, useReveal } from '@/lib/animations'

interface Channel {
  icon: React.ReactNode
  name: string
  handle: string
  href: string
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
    href: 'https://wa.me/97400000000',
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

  const sectionControls = useReveal(sectionRef, { once: false, margin: '-60px' })
  const leftControls = useReveal(leftRef, { once: false, margin: '-60px' })
  const rightControls = useReveal(rightRef, { once: false, margin: '-60px' })

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const name = (form.elements.namedItem('name') as HTMLInputElement).value
    const email = (form.elements.namedItem('email') as HTMLInputElement).value
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value

    const subject = encodeURIComponent(`WellBean launch notification — ${name}`)
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)
    window.open(`mailto:hello@wellbean.qa?subject=${subject}&body=${body}`)
    setSubmitted(true)
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="bg-clay py-24 md:py-32 px-6 md:px-12"
    >
      {/* Section header */}
      <motion.div
        className="max-w-7xl mx-auto flex items-center gap-6 mb-20"
        variants={headerReveal}
        initial="visible"
        animate={sectionControls}
      >
        <span className="font-sans text-xs uppercase tracking-[0.2em] text-charcoal/30 whitespace-nowrap">
          Contact
        </span>
        <div className="flex-1 h-px bg-charcoal/10" />
      </motion.div>

      {/* Main grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

        {/* LEFT COLUMN */}
        <motion.div
          ref={leftRef}
          variants={slideInLeft}
          initial="visible"
          animate={leftControls}
        >
          <h2
            className="font-display font-bold leading-[1.05] tracking-tight text-espresso"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
          >
            Be the first
            <br />
            to know.
          </h2>

          <p className="mt-6 font-sans text-base text-charcoal/60 max-w-[38ch] leading-relaxed">
            We&apos;re putting the finishing touches on WellBean. Drop us a line and you&apos;ll
            hear from us the moment we open our doors in Doha.
          </p>

          {/* Contact channels */}
          <motion.div
            variants={staggerContainer}
            initial="visible"
            animate={leftControls}
            className="mt-12 space-y-4"
          >
            {channels.map((channel) => (
              <motion.a
                key={channel.name}
                href={channel.href}
                target="_blank"
                rel="noopener noreferrer"
                variants={fadeUp}
                className="block group"
              >
                <div className="flex items-center gap-4 py-4 border-b border-charcoal/[0.08]">
                  <div className="w-10 h-10 rounded-full bg-espresso/[0.06] flex items-center justify-center group-hover:bg-espresso transition-colors duration-300 shrink-0">
                    {channel.icon}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-display font-semibold text-sm text-charcoal">{channel.name}</span>
                    <span className="font-sans text-xs text-charcoal/40">{channel.handle}</span>
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN — contact form */}
        <motion.div
          ref={rightRef}
          variants={fadeUp}
          initial="visible"
          animate={rightControls}
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
                <p className="font-display font-bold text-lg text-espresso mb-6">Join the launch list</p>

                <div className="mb-6">
                  <label className="block font-sans text-xs uppercase tracking-[0.15em] text-charcoal/40 mb-3">
                    Name
                  </label>
                  <input
                    name="name"
                    type="text"
                    placeholder="Your name"
                    required
                    className="w-full bg-cream/50 rounded-xl px-4 py-3.5 font-sans text-base md:text-sm text-charcoal placeholder:text-charcoal/25 border border-transparent focus:border-espresso/20 focus:bg-cream focus:outline-none transition-all duration-200"
                  />
                </div>

                <div className="mb-6">
                  <label className="block font-sans text-xs uppercase tracking-[0.15em] text-charcoal/40 mb-3">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    required
                    className="w-full bg-cream/50 rounded-xl px-4 py-3.5 font-sans text-base md:text-sm text-charcoal placeholder:text-charcoal/25 border border-transparent focus:border-espresso/20 focus:bg-cream focus:outline-none transition-all duration-200"
                  />
                </div>

                <div className="mb-6">
                  <label className="block font-sans text-xs uppercase tracking-[0.15em] text-charcoal/40 mb-3">
                    Message <span className="normal-case tracking-normal text-charcoal/25">(optional)</span>
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Anything you'd like us to know?"
                    className="w-full bg-cream/50 rounded-xl px-4 py-3.5 font-sans text-base md:text-sm text-charcoal placeholder:text-charcoal/25 border border-transparent focus:border-espresso/20 focus:bg-cream focus:outline-none transition-all duration-200 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="group w-full mt-2 rounded-xl bg-espresso text-cream font-display font-bold text-sm py-4 px-4 md:px-8 flex items-center justify-center gap-2 md:gap-3 whitespace-nowrap hover:bg-brown transition-colors duration-300 active:scale-[0.98]"
                >
                  Notify me when you open
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
                <CheckCircle size={48} weight="fill" className="text-espresso mb-4" />
                <p className="font-display font-bold text-xl text-espresso">You&apos;re on the list!</p>
                <p className="font-sans text-sm text-charcoal/50 mt-2">
                  We&apos;ll reach out the moment WellBean opens in Doha.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  )
}
