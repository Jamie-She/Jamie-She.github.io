import { useEffect, useState } from 'react'
import { navigation, profile } from '../data/content'

const trackedSections = [
  'framework',
  'works',
  'workflow',
  'capabilities',
  'thinking',
  'contact',
]

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('works')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visible) setActiveSection(visible.target.id)
      },
      { rootMargin: '-18% 0px -68% 0px', threshold: [0, 0.2, 0.5] },
    )

    trackedSections.forEach((id) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="site-header">
      <a className="brand focus-ring" href="#top" onClick={closeMenu}>
        {profile.brand}
      </a>

      <nav className="desktop-nav" aria-label="主要导航">
        {navigation.map((item) => {
          const section = item.href.slice(1)
          const active =
            section === activeSection ||
            (section === 'framework' &&
              ['workflow', 'capabilities'].includes(activeSection))

          return (
            <a
              key={item.href}
              href={item.href}
              className="nav-link focus-ring"
              data-active={active}
            >
              {item.label}
            </a>
          )
        })}
      </nav>

      <a className="contact-link focus-ring" href="#contact">
        联系我
      </a>

      <button
        className="menu-button focus-ring"
        type="button"
        aria-expanded={menuOpen}
        aria-controls="mobile-navigation"
        aria-label={menuOpen ? '关闭菜单' : '打开菜单'}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span />
        <span />
      </button>

      <div
        className="mobile-navigation"
        id="mobile-navigation"
        data-open={menuOpen}
      >
        <nav aria-label="移动端导航">
          {navigation.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              className="focus-ring"
              onClick={closeMenu}
            >
              <span>0{index + 1}</span>
              {item.label}
            </a>
          ))}
          <a href="#contact" className="focus-ring" onClick={closeMenu}>
            <span>0{navigation.length + 1}</span>
            联系我
          </a>
        </nav>
      </div>
    </header>
  )
}
