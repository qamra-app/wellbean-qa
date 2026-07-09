'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { InstagramLogo, WhatsappLogo } from '@phosphor-icons/react'
import Image from 'next/image'
import { fadeUp, staggerContainer, useReveal } from '@/lib/animations'

const navLinks = ['About', 'Visit', 'Contact']

export default function Footer() {
  const ref = useRef<HTMLElement>(null)
  const controls = useReveal(ref, { once: false, margin: '-60px' })

  return (
    <footer ref={ref} className="bg-espresso text-cream">
      {/* Top section */}
      <motion.div
        variants={staggerContainer}
        initial="visible"
        animate={controls}
        className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Col 1 — Brand */}
          <motion.div variants={fadeUp}>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src="/wellbean-logo.jpg"
                  alt="WellBean"
                  width={40}
                  height={40}
                  className="object-cover w-full h-full"
                />
              </div>
              <p className="font-display font-bold text-3xl text-cream">WellBean</p>
            </div>
            <p className="font-sans text-sm font-medium text-white/90 mt-1">Specialty Coffee</p>
            <p className="font-script text-cream/65 text-3xl mt-6 leading-none flex items-center gap-1.5">
              Fill your cup{' '}
              <svg
                style={{ width: '0.65em', height: '0.65em' }}
                viewBox="0 0 28 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M14 23.5C13 22.5 2.5 16 2.5 8.5C2.5 5.1 5.1 2.5 8.5 2.5C11 2.5 13.1 4 14 6.2C14.9 4 17 2.5 19.5 2.5C22.9 2.5 25.5 5.1 25.5 8.5C25.5 16 15 22.5 14 23.5Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </p>
          </motion.div>

          {/* Col 2 — Navigate */}
          <motion.div variants={fadeUp}>
            <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-cream/60 mb-4">
              Navigate
            </p>
            <nav className="flex flex-col">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="block font-sans text-sm font-medium text-white hover:text-cream/70 transition-colors py-2.5 md:py-1.5"
                >
                  {link}
                </a>
              ))}
            </nav>
          </motion.div>

          {/* Col 3 — Connect */}
          <motion.div variants={fadeUp}>
            <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-cream/60 mb-4">
              Connect
            </p>
            <div className="flex flex-col">
              <a
                href="https://instagram.com/wellbean.qa"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 font-sans text-sm font-medium text-white hover:text-cream/70 transition-colors py-2.5 md:py-1.5"
              >
                <InstagramLogo size={18} />
                @wellbean.qa
              </a>
              <a
                href="https://wa.me/97400000000"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 font-sans text-sm font-medium text-white hover:text-cream/70 transition-colors py-2.5 md:py-1.5"
              >
                <WhatsappLogo size={18} />
                Chat with us
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Divider */}
      <div className="border-t border-cream/15 max-w-7xl mx-auto px-6 md:px-12" />

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row justify-between items-center gap-3">
        <p className="font-sans text-xs text-cream/55">
          © 2026 WellBean. All rights reserved.
        </p>
        <p className="font-sans text-xs text-cream/55">Vendôme Mall · Lusail, Qatar</p>
      </div>
    </footer>
  )
}
