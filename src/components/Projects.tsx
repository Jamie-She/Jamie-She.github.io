import {
  type FocusEvent,
  type KeyboardEvent,
  type PointerEvent,
  useEffect,
  useRef,
  useState,
} from 'react'
import { practiceStages, type PracticeMedia, type PracticeStage } from '../data/content'
import { activateMediaSound, deactivateMediaSound, enableMediaSound } from '../lib/mediaAudio'
import { ExternalIcon } from './ui'

function StageMedia({ media, active = true }: { media: PracticeMedia; active?: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video || !active) {
      video?.pause()
      return
    }
    if (playing) void video.play().catch(() => undefined)
    else video.pause()
  }, [active, playing])

  const startPreview = () => {
    if (!active) return
    setPlaying(true)
    void activateMediaSound(videoRef.current, media.audioProfile)
  }

  const stopPreview = () => {
    setPlaying(false)
    deactivateMediaSound(videoRef.current)
  }

  const enablePreview = () => {
    if (!active) return
    setPlaying(true)
    void enableMediaSound(videoRef.current, media.audioProfile)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      enablePreview()
    }
  }

  const updatePointerDepth = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'mouse') return
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width - 0.5
    const y = (event.clientY - bounds.top) / bounds.height - 0.5
    event.currentTarget.style.setProperty('--media-rx', `${(-y * 2.4).toFixed(2)}deg`)
    event.currentTarget.style.setProperty('--media-ry', `${(x * 2.4).toFixed(2)}deg`)
    event.currentTarget.style.setProperty('--media-x', `${((x + 0.5) * 100).toFixed(1)}%`)
    event.currentTarget.style.setProperty('--media-y', `${((y + 0.5) * 100).toFixed(1)}%`)
  }

  const resetPointerDepth = (element: HTMLElement) => {
    element.style.setProperty('--media-rx', '0deg')
    element.style.setProperty('--media-ry', '0deg')
    element.style.setProperty('--media-x', '50%')
    element.style.setProperty('--media-y', '50%')
  }

  return (
    <figure
      className="stage-media"
      data-shape={media.shape}
      data-playing={playing}
      tabIndex={active ? 0 : -1}
      onPointerMove={updatePointerDepth}
      onPointerEnter={(event: PointerEvent<HTMLElement>) => {
        if (event.pointerType === 'mouse') startPreview()
      }}
      onPointerDown={(event: PointerEvent<HTMLElement>) => {
        if (event.pointerType !== 'mouse') enablePreview()
      }}
      onPointerLeave={(event: PointerEvent<HTMLElement>) => {
        if (event.pointerType === 'mouse') {
          resetPointerDepth(event.currentTarget)
          stopPreview()
        }
      }}
      onFocus={startPreview as unknown as (event: FocusEvent<HTMLElement>) => void}
      onBlur={stopPreview as unknown as (event: FocusEvent<HTMLElement>) => void}
      onKeyDown={handleKeyDown}
    >
      <div className="stage-media-visual">
        <img src={media.src} alt={media.alt} loading="lazy" />
        {media.video ? (
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
        ) : null}
      </div>
      <figcaption>
        <small>{media.label}</small>
        <strong>{media.title}</strong>
        {media.detail ? <span>{media.detail}</span> : null}
      </figcaption>
    </figure>
  )
}

function ChapterCopy({ stage }: { stage: PracticeStage }) {
  return (
    <header className="chapter-copy reveal">
      <div className="chapter-index-line">
        <span>{stage.phase}</span>
        <span>{stage.period}</span>
        {stage.current ? <em>NOW</em> : null}
      </div>
      <h3>{stage.title}</h3>
      <p className="chapter-claim">{stage.claim}</p>
      <p className="chapter-practice">{stage.practice}</p>
      <div className="chapter-result">
        <span>{stage.aiRole}</span>
        <strong>{stage.proof}</strong>
      </div>
    </header>
  )
}

function CurrentStageShowcase({ stage }: { stage: PracticeStage }) {
  const [activeCase, setActiveCase] = useState(1)
  const activeMedia = stage.media[activeCase]

  return (
    <div className="current-stage-showcase reveal reveal-delay">
      <div className="current-stage-screen">
        <StageMedia key={activeMedia.title} media={activeMedia} />
        {activeMedia.href ? (
          <a
            className="current-stage-link focus-ring"
            href={activeMedia.href}
            target="_blank"
            rel="noreferrer"
          >
            {activeMedia.cta ?? '打开作品'} <ExternalIcon />
          </a>
        ) : null}
      </div>

      <div className="current-stage-list" aria-label="NOW阶段案例切换">
        {stage.media.map((media, index) => (
          <button
            type="button"
            className="current-stage-item focus-ring"
            data-active={index === activeCase}
            aria-pressed={index === activeCase}
            onClick={() => setActiveCase(index)}
            key={media.title}
          >
            <span>0{index + 1}</span>
            <strong>{media.title}</strong>
            <small>{media.label}</small>
            <i aria-hidden="true" />
          </button>
        ))}
      </div>
    </div>
  )
}

export function Projects() {
  return (
    <section className="works-section" id="works">
      <header className="practice-intro">
        <div className="practice-intro-copy reveal">
          <h2>半年，三次变化</h2>
          <p>从一件完整作品，到持续推进复杂任务</p>
        </div>
        <nav className="chapter-directory reveal reveal-delay" aria-label="实践演进目录">
          {practiceStages.map((stage) => (
            <a className="chapter-directory-item focus-ring" href={`#practice-stage-${stage.phase}`} key={stage.phase}>
              <span>{stage.phase}</span>
              <strong>{stage.title}</strong>
              <small>{stage.period}</small>
              {stage.current ? <em>NOW</em> : null}
            </a>
          ))}
        </nav>
      </header>

      <article className="practice-chapter practice-chapter--first" id="practice-stage-01">
        <div className="chapter-inner chapter-inner--first">
          <ChapterCopy stage={practiceStages[0]} />
          <div className="stage-one-gallery reveal reveal-delay">
            {practiceStages[0].media.map((media) => <StageMedia media={media} key={media.title} />)}
          </div>
        </div>
      </article>

      <article className="practice-chapter practice-chapter--lightbox" id="practice-stage-02">
        <div className="chapter-lightbox">
          <ChapterCopy stage={practiceStages[1]} />
          <div className="stage-two-gallery reveal reveal-delay">
            {practiceStages[1].media.map((media) => <StageMedia media={media} key={media.title} />)}
          </div>
          <span className="lightbox-version" aria-hidden="true">JAMIE / CONTACT SHEET / 02</span>
        </div>
      </article>

      <article className="practice-chapter practice-chapter--current" id="practice-stage-03">
        <div className="chapter-inner chapter-inner--current">
          <ChapterCopy stage={practiceStages[2]} />
          <CurrentStageShowcase stage={practiceStages[2]} />
        </div>
      </article>
    </section>
  )
}
