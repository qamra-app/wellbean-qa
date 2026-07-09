'use client'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Manifesto from '@/components/Manifesto'
import About from '@/components/About'
import Hours from '@/components/Hours'
import RitualVideo from '@/components/RitualVideo'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Manifesto />
        <About />
        <Hours />
        <RitualVideo />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
