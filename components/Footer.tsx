'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { InstagramLogo, WhatsappLogo } from '@phosphor-icons/react'
import { fadeUp } from '@/lib/animations'

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://instagram.com/wellbean.qa',
    icon: InstagramLogo,
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/97400000000',
    icon: WhatsappLogo,
  },
]

export default function Footer() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.footer
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      id="footer"
      className="bg-espresso text-linen py-16 px-8 md:px-16 lg:px-24"
    >
      {/* Top row */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 max-w-6xl mx-auto">
        {/* Brand */}
        <div>
          <p className="font-serif text-4xl font-light text-linen leading-none">
            WellBean
          </p>
          <p className="font-sans text-xs uppercase tracking-[0.2em] text-linen/40 mt-1">
            Specialty Coffee · Doha, Qatar
          </p>
        </div>

        {/* Social icons */}
        <div className="flex items-center gap-3">
          {socialLinks.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="
                w-10 h-10 rounded-full border border-linen/20
                flex items-center justify-center
                text-linen/70 hover:text-linen hover:bg-linen/10
                transition-all duration-300
              "
            >
              <Icon size={18} weight="regular" />
            </a>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-linen/10 my-8 max-w-6xl mx-auto" />

      {/* Bottom row */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 max-w-6xl mx-auto">
        <p className="font-sans text-xs text-linen/30">
          © 2025 WellBean. All rights reserved.
        </p>
        <p className="font-serif italic text-xs text-linen/30">
          &ldquo;Your daily dose of well-bean-ing&rdquo;
        </p>
      </div>
    </motion.footer>
  )
}
