'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'

const lines = ['Almost.', 'Tiny things matter.', 'So do smiles.']
const CHAR_MS = 65
const LINE_GAP = 380

export default function Manifesto() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: false, margin: '-80px' })

  const [mounted, setMounted] = useState(false)
  const [displayed, setDisplayed] = useState(lines.map(l => l))
  const [cursorLine, setCursorLine] = useState<number | null>(null)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (!mounted) return

    if (!inView) {
      setDisplayed(lines.map(() => ''))
      setCursorLine(null)
      return
    }

    const timeouts: ReturnType<typeof setTimeout>[] = []
    let offset = 0

    lines.forEach((line, li) => {
      const t0 = setTimeout(() => setCursorLine(li), offset)
      timeouts.push(t0)

      for (let ci = 0; ci <= line.length; ci++) {
        const t = setTimeout(() => {
          setDisplayed(prev => {
            const next = [...prev]
            next[li] = line.slice(0, ci)
            return next
          })
        }, offset + ci * CHAR_MS)
        timeouts.push(t)
      }
      offset += line.length * CHAR_MS + LINE_GAP
    })

    const tDone = setTimeout(() => setCursorLine(null), offset)
    timeouts.push(tDone)

    return () => timeouts.forEach(clearTimeout)
  }, [mounted, inView])

  return (
    <section ref={ref} className="bg-cream py-20 md:py-28 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center gap-8 md:gap-0">

        {/* Text — full width on mobile, flex-1 on desktop */}
        <div className="w-full md:flex-1 md:min-w-0 flex flex-col gap-1 md:gap-2">
          {lines.map((line, li) => (
            <p
              key={line}
              className="font-display font-bold text-espresso leading-[1.45] tracking-tight"
              style={{
                fontSize: 'clamp(1.4rem, 6vw, 6rem)',
                overflow: 'visible',
              }}
            >
              {mounted ? displayed[li] : line}
              {cursorLine === li && (
                <span
                  aria-hidden="true"
                  className="inline-block ml-[6px]"
                  style={{
                    width: '2px',
                    height: '0.72em',
                    background: 'var(--color-roast)',
                    verticalAlign: 'text-bottom',
                    animation: 'blink 0.6s step-end infinite',
                    borderRadius: '1px',
                  }}
                />
              )}
            </p>
          ))}
        </div>

        {/* Cup — overflow-hidden scoped here only, won't affect text */}
        <div className="flex-shrink-0 overflow-hidden self-center md:self-auto"
          style={{ width: 'clamp(160px, 28vw, 340px)' }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.9, ease: 'easeOut', delay: 0.3 }}
            className="relative"
            style={{
              width: '100%',
              aspectRatio: '3 / 5',
              transform: 'rotate(4deg)',
              maskImage: 'radial-gradient(ellipse 78% 82% at 48% 48%, black 35%, transparent 78%)',
              WebkitMaskImage: 'radial-gradient(ellipse 78% 82% at 48% 48%, black 35%, transparent 78%)',
            }}
          >
            <Image
              src="/manifesto-tumbler.jpg"
              alt="WellBean cup illustration"
              fill
              className="object-cover object-center"
              style={{ mixBlendMode: 'multiply' }}
              unoptimized
            />
          </motion.div>
        </div>

      </div>
    </section>
  )
}
