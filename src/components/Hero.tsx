import { type CSSProperties, type PointerEvent, useEffect, useRef, useState } from 'react'
import { heroMedia, profile } from '../data/content'
import {
  activateMediaSound,
  deactivateMediaSound,
  disableMediaSound,
  enableMediaSound,
  isMediaSoundEnabled,
  subscribeMediaSound,
} from '../lib/mediaAudio'

const mediaItems = [heroMedia[2], heroMedia[0], heroMedia[1], heroMedia[3]]

export function Hero() {
  const [activeMedia, setActiveMedia] = useState(0)
  const [soundEnabled, setSoundEnabled] = useState(isMediaSoundEnabled)
  const [contextOpen, setContextOpen] = useState(false)
  const stageRef = useRef<HTMLDivElement>(null)
  const active = mediaItems[activeMedia]

  useEffect(() => subscribeMediaSound(setSoundEnabled), [])

  const activeVideo = () => stageRef.current?.querySelector<HTMLVideoElement>('video') ?? null

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse') return

    const bounds = event.currentTarget.getBoundingClientRect()
    const radius = Math.min(184, Math.max(144, bounds.width * 0.12))
    const x = Math.max(radius, Math.min(event.clientX - bounds.left, bounds.width - radius))
    const y = Math.max(radius, Math.min(event.clientY - bounds.top, bounds.height - radius))
    event.currentTarget.style.setProperty('--lens-x', `${x}px`)
    event.currentTarget.style.setProperty('--lens-y', `${y}px`)
    event.currentTarget.style.setProperty('--lens-opacity', '1')
  }

  const handlePointerLeave = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty('--lens-opacity', '0')
    deactivateMediaSound(activeVideo())
  }

  const selectMedia = (index: number) => {
    deactivateMediaSound(activeVideo())
    setContextOpen(false)
    setActiveMedia(index)
  }

  const toggleSound = () => {
    if (soundEnabled) {
      disableMediaSound()
      return
    }

    void enableMediaSound(activeVideo(), active.audioProfile)
  }

  const stageStyle = {
    '--media-ratio': active.orientation === 'portrait' ? 'portrait' : 'landscape',
  } as CSSProperties

  return (
    <section className="hero-section" id="top">
      <div className="hero-copy reveal">
        <span className="hero-eyebrow">JAMIE · PRODUCT / CONTENT / OPERATION</span>
        <h1 aria-label={profile.heroTitle}>
          <span>我是Jamie</span>
          <span>和AI一起做内容</span>
          <span>与互动体验</span>
        </h1>
        <p>{profile.heroDescription}</p>
      </div>

      <div className="hero-index reveal reveal-delay" role="tablist" aria-label="精选实践">
        {mediaItems.map((media, index) => (
          <button
            className="hero-index-item focus-ring"
            type="button"
            role="tab"
            aria-selected={activeMedia === index}
            aria-controls="hero-media-stage"
            data-active={activeMedia === index}
            onClick={() => selectMedia(index)}
            onMouseEnter={() => selectMedia(index)}
            onFocus={() => selectMedia(index)}
            key={media.project}
          >
            <span>{String(index + 1).padStart(2, '0')}</span>
            <strong>{media.project}</strong>
            <small>{media.label}</small>
          </button>
        ))}
      </div>

      <div className="hero-stage-shell reveal reveal-delay">
        <div
          ref={stageRef}
          className="hero-stage"
          id="hero-media-stage"
          role="tabpanel"
          aria-label={`${active.project}动态预览`}
          data-orientation={active.orientation}
          data-context-open={contextOpen}
          style={stageStyle}
          onPointerMove={handlePointerMove}
          onPointerEnter={() => void activateMediaSound(activeVideo(), active.audioProfile)}
          onPointerDown={() => void enableMediaSound(activeVideo(), active.audioProfile)}
          onPointerLeave={handlePointerLeave}
        >
          <img className="hero-stage-ambient" src={active.src} alt="" aria-hidden="true" />
          <video
            key={active.project}
            className="hero-stage-video"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={active.src}
            aria-label={active.alt}
          >
            {active.videoWebm ? <source src={active.videoWebm} type="video/webm" /> : null}
            <source src={active.video} type="video/mp4" />
          </video>

          <div className="hero-stage-shade" aria-hidden="true" />
          <div className="hero-stage-topline">
            <span><i aria-hidden="true" /> LIVE WORK / 2026</span>
            <span>{String(activeMedia + 1).padStart(2, '0')} / {String(mediaItems.length).padStart(2, '0')}</span>
          </div>

          <div className="hero-context-layer" aria-hidden={!contextOpen}>
            <div className="hero-context-card">
              <span>PROCESS VIEW</span>
              <strong>{active.project}</strong>
              <ul>
                {active.processNotes.map((note) => (
                  <li key={note.label}>
                    <span>{note.label}</span>
                    <p>{note.value}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="hero-stage-caption">
            <span>{active.label}</span>
            <div>
              <strong>{active.project}</strong>
              <small>{active.context}</small>
            </div>
          </div>

          <button
            className="hero-sound-toggle focus-ring"
            type="button"
            aria-pressed={soundEnabled}
            onPointerDown={(event) => event.stopPropagation()}
            onClick={(event) => {
              event.stopPropagation()
              toggleSound()
            }}
            data-enabled={soundEnabled}
          >
            <span className="hero-sound-bars" aria-hidden="true"><i /><i /><i /></span>
            <span>{soundEnabled ? '声音已开启' : '开启声音'}</span>
          </button>

          <button
            className="hero-context-toggle focus-ring"
            type="button"
            aria-pressed={contextOpen}
            onPointerDown={(event) => event.stopPropagation()}
            onClick={(event) => {
              event.stopPropagation()
              setContextOpen((current) => !current)
            }}
          >
            <span>{contextOpen ? '回到成品' : '查看过程'}</span>
          </button>

          <p className="hero-lens-hint">移动光标，查看作品背后的过程</p>
        </div>
      </div>

      <span className="hero-scroll-mark" aria-hidden="true">SCROLL TO TRACE THE THREAD ↓</span>
    </section>
  )
}
