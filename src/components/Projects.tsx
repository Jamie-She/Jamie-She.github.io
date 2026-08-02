import { type FocusEvent, type KeyboardEvent, type PointerEvent, type ReactNode, useEffect, useRef, useState } from 'react'
import { practiceStages, type PracticeMedia, type PracticeStage } from '../data/content'
import { activateMediaSound, deactivateMediaSound, enableMediaSound } from '../lib/mediaAudio'
import { ExternalIcon } from './ui'

function ProjectVideo({ media, active = true }: { media: PracticeMedia; active?: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (!active) {
      video.pause()
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.2) {
          void video.play().catch(() => undefined)
        } else {
          video.pause()
        }
      },
      { threshold: [0, 0.2, 0.6] },
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [active])

  return (
    <video
      ref={videoRef}
      muted
      loop
      playsInline
      preload="metadata"
      poster={media.src}
      aria-label={`${media.title}真实录屏`}
    >
      {media.videoWebm ? <source src={media.videoWebm} type="video/webm" /> : null}
      <source src={media.video} type="video/mp4" />
    </video>
  )
}

function ProjectMedia({ media, active = true }: { media: PracticeMedia; active?: boolean }) {
  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width - 0.5
    const y = (event.clientY - bounds.top) / bounds.height - 0.5

    event.currentTarget.style.cssText = `--media-x:${x};--media-y:${y};`
  }

  const resetDepth = (event: PointerEvent<HTMLElement>) => {
    event.currentTarget.style.removeProperty('--media-x')
    event.currentTarget.style.removeProperty('--media-y')
  }

  const findVideo = (target: HTMLElement) => target.querySelector('video')

  const content: ReactNode = (
    <>
      {media.video && media.src ? (
        <img className="chapter-media-halo" src={media.src} alt="" aria-hidden="true" />
      ) : null}
      <div className="chapter-media-image">
        {media.video && media.src ? (
          <img className="chapter-media-ambient" src={media.src} alt="" aria-hidden="true" />
        ) : null}
        {media.video ? (
          <ProjectVideo media={media} active={active} />
        ) : media.src ? (
          <img src={media.src} alt={media.alt} loading="lazy" />
        ) : null}
      </div>
      <span className="chapter-media-caption">
        <span className="chapter-media-label">{media.label}</span>
        <span className="chapter-media-copy">
          <strong>{media.title}</strong>
          {media.detail ? <small>{media.detail}</small> : null}
        </span>
        {media.cta ? <span className="chapter-media-cta">{media.cta}<ExternalIcon /></span> : null}
        {media.status ? <span className="chapter-media-status">{media.status}</span> : null}
      </span>
    </>
  )

  const sharedProps = {
    className: 'chapter-media focus-ring',
    'data-shape': media.shape,
    'data-position': media.position,
    'data-motion': media.video ? 'video' : 'image',
    'data-active': active,
    onPointerMove: handlePointerMove,
    onPointerEnter: (event: PointerEvent<HTMLElement>) => {
      void activateMediaSound(findVideo(event.currentTarget), media.audioProfile)
    },
    onPointerDown: (event: PointerEvent<HTMLElement>) => {
      void enableMediaSound(findVideo(event.currentTarget), media.audioProfile)
    },
    onKeyDown: (event: KeyboardEvent<HTMLElement>) => {
      if (event.key === 'Enter' || event.key === ' ') {
        void enableMediaSound(findVideo(event.currentTarget), media.audioProfile)
      }
    },
    onPointerLeave: resetDepth,
    onPointerOut: (event: PointerEvent<HTMLElement>) => {
      if (event.pointerType === 'mouse' && !event.currentTarget.contains(event.relatedTarget as Node)) {
        deactivateMediaSound(findVideo(event.currentTarget))
      }
    },
    onFocus: (event: FocusEvent<HTMLElement>) => {
      void activateMediaSound(findVideo(event.currentTarget), media.audioProfile)
    },
    onBlur: (event: FocusEvent<HTMLElement>) => {
      deactivateMediaSound(findVideo(event.currentTarget))
    },
  }

  if (media.href) {
    return (
      <a
        {...sharedProps}
        href={media.href}
        target="_blank"
        rel="noreferrer"
        tabIndex={active ? 0 : -1}
        aria-label={`${media.title}，打开作品`}
      >
        {content}
      </a>
    )
  }

  return <figure {...sharedProps}>{content}</figure>
}

function CurrentStageShowcase({ stage }: { stage: PracticeStage }) {
  const [activeCase, setActiveCase] = useState(0)
  const [paused, setPaused] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const syncPreference = () => setReduceMotion(mediaQuery.matches)
    syncPreference()
    mediaQuery.addEventListener('change', syncPreference)
    return () => mediaQuery.removeEventListener('change', syncPreference)
  }, [])

  return (
    <div
      className="chapter-carousel reveal reveal-delay"
      data-paused={paused || reduceMotion}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="chapter-carousel-stage">
        {stage.media.map((media, index) => {
          const isActive = index === activeCase
          return (
            <div
              className="chapter-carousel-slide"
              data-active={isActive}
              role="tabpanel"
              aria-hidden={!isActive}
              id={`current-case-${index + 1}`}
              key={media.title}
            >
              <ProjectMedia media={media} active={isActive} />
            </div>
          )
        })}
        <span className="chapter-carousel-count" aria-hidden="true">
          {String(activeCase + 1).padStart(2, '0')} / {String(stage.media.length).padStart(2, '0')}
        </span>
      </div>

      <div className="chapter-carousel-tabs" role="tablist" aria-label="NOW阶段案例切换">
        {stage.media.map((media, index) => {
          const isActive = index === activeCase
          return (
            <button
              className="chapter-carousel-tab focus-ring"
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`current-case-${index + 1}`}
              data-active={isActive}
              onClick={() => setActiveCase(index)}
              key={media.title}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{media.title}</strong>
              <small>{media.label}</small>
              {isActive ? (
                <i
                  key={`${activeCase}-${paused}`}
                  aria-hidden="true"
                  onAnimationEnd={() => {
                    if (!paused && !reduceMotion) {
                      setActiveCase((current) => (current + 1) % stage.media.length)
                    }
                  }}
                />
              ) : null}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function Projects() {
  const [activeStage, setActiveStage] = useState(practiceStages[0].phase)

  useEffect(() => {
    const chapters = practiceStages
      .map((stage) => document.getElementById(`practice-stage-${stage.phase}`))
      .filter((chapter): chapter is HTMLElement => Boolean(chapter))

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visible) {
          const chapter = visible.target as HTMLElement
          setActiveStage(chapter.dataset.stage ?? practiceStages[0].phase)
        }
      },
      { rootMargin: '-18% 0px -48% 0px', threshold: [0.05, 0.25, 0.5] },
    )

    chapters.forEach((chapter) => observer.observe(chapter))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="works-section" id="works">
      <header className="practice-intro">
        <span>PRACTICE EVOLUTION / 2026</span>
        <h2 className="reveal">
          从一次共创，
          <br />
          到长程任务交付
        </h2>
        <p className="reveal">半年里，和AI一起做事的方式变了三次</p>
      </header>

      <nav className="evolution-navigation" id="evolution-navigation" aria-label="三次实践演进">
        <span className="evolution-navigation-label">THREE SHIFTS</span>
        <div className="evolution-tabs" role="tablist" aria-label="点击直达对应阶段">
          {practiceStages.map((stage) => (
            <a
              className="evolution-tab focus-ring"
              data-active={activeStage === stage.phase}
              href={`#practice-stage-${stage.phase}`}
              aria-current={activeStage === stage.phase ? 'step' : undefined}
              onClick={() => setActiveStage(stage.phase)}
              key={stage.phase}
            >
              <span>{stage.phase}</span>
              <strong>{stage.title}</strong>
              <small>{stage.english}</small>
            </a>
          ))}
        </div>
      </nav>

      {practiceStages.map((stage, stageIndex) => (
        <article
          className="practice-chapter"
          id={`practice-stage-${stage.phase}`}
          key={stage.phase}
          data-stage={stage.phase}
        >
          <span className="chapter-number" aria-hidden="true">
            {stage.phase}
          </span>

          <div className="chapter-inner">
            <header className="chapter-copy reveal">
              <div className="chapter-kicker-line">
                <span className="chapter-kicker">{stage.english}</span>
                {stage.current ? <span className="chapter-now"><i />NOW</span> : null}
              </div>
              <h3>{stage.title}</h3>
              <p className="chapter-claim">{stage.claim}</p>
              <p className="chapter-practice">{stage.practice}</p>
              <div className="chapter-result">
                <span>{stage.aiRole}</span>
                <strong>{stage.proof}</strong>
              </div>
            </header>

            {stage.current ? (
              <CurrentStageShowcase stage={stage} />
            ) : (
              <div className="chapter-gallery reveal reveal-delay" data-stage={stage.phase}>
                {stage.media.map((media) => (
                  <ProjectMedia key={media.title} media={media} />
                ))}
              </div>
            )}

            <aside className="chapter-progress" aria-label={`当前第${stage.phase}阶段`}>
              {practiceStages.map((item, index) => (
                <span key={item.phase} data-active={index === stageIndex}>
                  {item.phase}
                </span>
              ))}
            </aside>
          </div>
        </article>
      ))}
    </section>
  )
}
