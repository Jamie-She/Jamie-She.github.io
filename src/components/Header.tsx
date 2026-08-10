import { useEffect, useRef, useState } from 'react'
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
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const mobileNavigationRef = useRef<HTMLDivElement>(null)

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

  useEffect(() => {
    if (!menuOpen) return
    const previousOverflow = document.body.style.overflow
    const background = Array.from(
      document.querySelectorAll<HTMLElement>('.site-shell > main, .site-shell > footer'),
    )
    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        window.requestAnimationFrame(() => menuButtonRef.current?.focus())
        return
      }

      if (event.key !== 'Tab') return
      const focusable = [
        menuButtonRef.current,
        ...Array.from(mobileNavigationRef.current?.querySelectorAll<HTMLAnchorElement>('a') ?? []),
      ].filter(
        (element): element is HTMLAnchorElement | HTMLButtonElement => element !== null,
      )
      const first = focusable[0]
      const last = focusable.at(-1)
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last?.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first?.focus()
      }
    }
    document.body.style.overflow = 'hidden'
    background.forEach((element) => element.setAttribute('inert', ''))
    window.addEventListener('keydown', handleKeyDown)
    window.requestAnimationFrame(() => {
      mobileNavigationRef.current?.querySelector<HTMLAnchorElement>('a')?.focus()
    })
    return () => {
      document.body.style.overflow = previousOverflow
      background.forEach((element) => element.removeAttribute('inert'))
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [menuOpen])

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
        ref={menuButtonRef}
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

      {menuOpen ? (
        <div
          ref={mobileNavigationRef}
          className="mobile-navigation"
          id="mobile-navigation"
          data-open="true"
          role="dialog"
          aria-modal="true"
          aria-label="页面导航"
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
      ) : null}
    </header>
  )
}
