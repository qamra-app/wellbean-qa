'use client'

import { useEffect, useRef, type RefObject } from 'react'
import {
  Variants,
  useAnimationControls,
  useInView,
  type UseInViewOptions,
} from 'framer-motion'

// Progressive enhancement: static HTML ships in the 'visible' state so content
// stays readable if JS never executes (old WebViews, blocked/failed chunks,
// slow networks). Only after React mounts do we snap to 'hidden' and let the
// viewport drive the reveal — no JS means no animations, but never no content.
export function useReveal(ref: RefObject<Element | null>, options?: UseInViewOptions) {
  const controls = useAnimationControls()
  const inView = useInView(ref, options)
  const mounted = useRef(false)

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      controls.set('hidden')
    }
    controls.start(inView ? 'visible' : 'hidden')
  }, [inView, controls])

  return controls
}

// Same idea for animate-on-load elements (hero): visible in static HTML,
// entrance animation replays from 'hidden' once JS is confirmed running.
export function useEntrance() {
  const controls = useAnimationControls()

  useEffect(() => {
    controls.set('hidden')
    controls.start('visible')
  }, [controls])

  return controls
}

export const headerReveal: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring', stiffness: 120, damping: 20, mass: 0.8 },
  },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
}

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring', stiffness: 120, damping: 20 },
  },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1, scale: 1,
    transition: { type: 'spring', stiffness: 120, damping: 20 },
  },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export const slideRight: Variants = {
  hidden: { opacity: 0, x: 32, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring', stiffness: 120, damping: 20 },
  },
}

export const floatUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 80, damping: 16, mass: 0.6 },
  },
}
