import type { Metadata, Viewport } from 'next'
import { Syne, DM_Sans, Great_Vibes } from 'next/font/google'
import './globals.css'

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-syne',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
})

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-great-vibes',
})

// maximumScale stops iOS Safari's automatic focus/legacy zoom from rescaling
// the page; user-initiated pinch zoom still works (iOS ignores it for that).
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  title: 'WellBean | Specialty Coffee',
  description: 'Your daily dose of well-bean-ing. Specialty coffee coming soon to Qatar.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable} ${greatVibes.variable}`} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}
