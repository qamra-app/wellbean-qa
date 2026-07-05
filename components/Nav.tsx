'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { List, X } from '@phosphor-icons/react'
import { staggerContainer, fadeUp } from '@/lib/animations'

const links = ['About', 'Visit', 'Contact']

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 60)
  })

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        animate={{
          backgroundColor: scrolled ? 'rgba(250,250,249,0.95)' : 'rgba(0,0,0,0)',
          borderBottomColor: scrolled ? 'rgba(26,26,26,0.08)' : 'rgba(0,0,0,0)',
        }}
        style={{
          backdropFilter: scrolled ? 'blur(8px)' : 'none',
          borderBottomWidth: '1px',
          borderBottomStyle: 'solid',
          transition: 'background-color 0.3s ease, border-bottom-color 0.3s ease',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <span className="text-brown text-xs leading-none">●</span>
            <span
              className={`font-display font-bold text-lg tracking-tight transition-colors duration-300 ${
                scrolled ? 'text-espresso' : 'text-cream'
              }`}
            >
              WellBean
            </span>
          </a>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className={`relative font-sans text-sm font-medium transition-colors duration-200 pb-0.5
                  after:absolute after:bottom-0 after:left-0 after:h-px after:w-0
                  hover:after:w-full after:transition-all after:duration-300
                  ${
                    scrolled
                      ? 'text-charcoal/60 hover:text-espresso after:bg-espresso'
                      : 'text-cream/70 hover:text-cream after:bg-cream'
                  }
                `}
              >
                {link}
              </a>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X
                size={22}
                weight="bold"
                className={scrolled ? 'text-espresso' : 'text-cream'}
              />
            ) : (
              <List
                size={22}
                weight="bold"
                className={scrolled ? 'text-espresso' : 'text-cream'}
              />
            )}
          </button>
        </div>
      </motion.header>

      {/* Mobile slide-down menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed top-16 left-0 right-0 z-40 bg-warm-white border-b border-charcoal/10 px-6 py-8"
          >
            <motion.nav
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-4"
            >
              {links.map((link) => (
                <motion.a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  variants={fadeUp}
                  onClick={() => setMenuOpen(false)}
                  className="font-display text-3xl font-bold text-espresso hover:text-brown transition-colors duration-200"
                >
                  {link}
                </motion.a>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
