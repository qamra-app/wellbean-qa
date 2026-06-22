'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll } from 'framer-motion'
import { List, X } from '@phosphor-icons/react'
import { fadeUp } from '@/lib/animations'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Visit', href: '#hours' },
  { label: 'Contact', href: '#contact' },
]

const overlayLinkVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 80, damping: 20 },
  },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
}

const overlayContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
  exit: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 as const },
  },
}

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (v) => {
      setScrolled(v > 80)
    })
    return unsubscribe
  }, [scrollY])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      {/* Floating Pill Navbar */}
      <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 80, damping: 20, delay: 0.3 }}
          className={[
            'max-w-2xl w-full mx-auto',
            'backdrop-blur-md ring-1 ring-espresso/10 rounded-full',
            'px-6 py-3 flex items-center justify-between',
            'transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]',
            scrolled
              ? 'bg-linen/95 shadow-[0_4px_32px_rgba(61,31,13,0.10)] scale-[0.97]'
              : 'bg-linen/80 shadow-none scale-100',
          ].join(' ')}
        >
          {/* Logo */}
          <a
            href="#"
            className="font-serif text-lg font-medium text-midnight tracking-tight shrink-0"
          >
            WellBean
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-sans text-sm font-medium text-midnight/70 hover:text-espresso transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex items-center justify-center w-8 h-8 rounded-full text-midnight/70 hover:text-espresso transition-colors duration-300"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <List size={20} weight="regular" />
          </button>
        </motion.div>
      </nav>

      {/* Mobile Full-Screen Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-overlay"
            initial={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 2.5rem) 2.5rem)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at calc(100% - 2.5rem) 2.5rem)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 2.5rem) 2.5rem)' }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-0 z-[60] bg-linen flex flex-col px-8 pt-8 pb-16"
          >
            {/* Close button */}
            <div className="flex justify-end">
              <motion.button
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.2 }}
                onClick={() => setMobileOpen(false)}
                className="w-10 h-10 rounded-full border border-espresso/20 flex items-center justify-center text-midnight hover:bg-espresso/5 transition-colors duration-300"
                aria-label="Close menu"
              >
                <X size={18} weight="regular" />
              </motion.button>
            </div>

            {/* Nav links */}
            <motion.div
              variants={overlayContainerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col gap-4 mt-16"
            >
              {navLinks.map((link) => (
                <motion.div key={link.href} variants={overlayLinkVariants} className="overflow-hidden">
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-serif text-5xl font-light text-midnight leading-tight hover:text-espresso transition-colors duration-300 block"
                  >
                    {link.label}
                  </a>
                </motion.div>
              ))}
            </motion.div>

            {/* Bottom tagline */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.5 }}
              className="mt-auto font-sans text-[10px] uppercase tracking-[0.25em] text-midnight/30"
            >
              Specialty Coffee · Qatar · Est. 2025
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
