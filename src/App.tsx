import { useEffect } from 'react'
import { Capabilities } from './components/Capabilities'
import { Contact } from './components/Contact'
import { Framework } from './components/Framework'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Projects } from './components/Projects'
import { Thinking } from './components/Thinking'
import { Workflow } from './components/Workflow'

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

  return (
    <div className="site-shell">
      <Header />
      <main>
        <Hero />
        <Projects />
        <Framework />
        <Workflow />
        <Capabilities />
        <Thinking />
      </main>
      <Contact />
    </div>
  )
}

export default App
