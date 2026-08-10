import { useEffect } from 'react'
import { Contact } from './components/Contact'
import { Framework } from './components/Framework'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Projects } from './components/Projects'
import { Thinking } from './components/Thinking'
import { disableMediaSound } from './lib/mediaAudio'

function App() {
  useEffect(() => {
    document.documentElement.classList.add('js')

    const elements = document.querySelectorAll<HTMLElement>('.reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -3% 0px' },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const pauseWhenHidden = () => {
      if (document.hidden) disableMediaSound()
    }
    document.addEventListener('visibilitychange', pauseWhenHidden)
    return () => document.removeEventListener('visibilitychange', pauseWhenHidden)
  }, [])

  useEffect(() => {
    let frame = 0

    const updateScrollState = () => {
      frame = 0
      const maximum = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)
      const progress = Math.min(Math.max(window.scrollY / maximum, 0), 1)
      document.documentElement.style.setProperty('--scroll-progress', progress.toFixed(4))
      document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`)
    }

    const requestScrollState = () => {
      if (frame) return
      frame = window.requestAnimationFrame(updateScrollState)
    }

    updateScrollState()
    window.addEventListener('scroll', requestScrollState, { passive: true })
    window.addEventListener('resize', requestScrollState)
    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', requestScrollState)
      window.removeEventListener('resize', requestScrollState)
      document.documentElement.style.removeProperty('--scroll-progress')
      document.documentElement.style.removeProperty('--scroll-y')
    }
  }, [])

  return (
    <div className="site-shell">
      <Header />
      <main>
        <Hero />
        <Projects />
        <Framework />
        <Thinking />
      </main>
      <Contact />
    </div>
  )
}

export default App
