import { type CSSProperties, type KeyboardEvent, type PointerEvent, useEffect, useRef, useState } from 'react'
import { heroMedia, profile } from '../data/content'
import {
  activateMediaSound,
  deactivateMediaSound,
  disableMediaSound,
  enableMediaSound,
  isMediaSoundEnabled,
  subscribeMediaSound,
} from '../lib/mediaAudio'

export function Hero() {
  const [activeMedia, setActiveMedia] = useState(0)
  const [soundEnabled, setSoundEnabled] = useState(isMediaSoundEnabled)
  const collageRef = useRef<HTMLDivElement>(null)

  useEffect(() => subscribeMediaSound(setSoundEnabled), [])

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width - 0.5
    const y = (event.clientY - bounds.top) / bounds.height - 0.5

    event.currentTarget.style.cssText = `--hero-x:${x};--hero-y:${y};`
  }

  const resetDepth = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.style.removeProperty('--hero-x')
    event.currentTarget.style.removeProperty('--hero-y')
  }

  const findVideo = (target: HTMLElement) => target.querySelector('video')

  const toggleSound = () => {
    if (soundEnabled) {
      disableMediaSound()
      return
    }

    const video = collageRef.current
      ?.querySelector<HTMLButtonElement>('.hero-media-card[data-active="true"]')
      ?.querySelector('video') ?? null
    void enableMediaSound(video, heroMedia[activeMedia].audioProfile)
  }

  const enableFromKeyboard = (
    event: KeyboardEvent<HTMLButtonElement>,
    mediaIndex: number,
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      void enableMediaSound(findVideo(event.currentTarget), heroMedia[mediaIndex].audioProfile)
    }
  }

  return (
    <section className="hero-section" id="top">
      <div className="hero-copy reveal">
        <span className="hero-eyebrow">JAMIE · PRODUCT / CONTENT / OPERATION</span>
        <h1 aria-label={profile.heroTitle}>
          {profile.heroTitleLines.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h1>

        <div className="hero-subline">
          <p>{profile.heroDescription}</p>
        </div>
      </div>

      <div className="hero-showcase-meta reveal reveal-delay">
        <span className="hero-collage-note">SELECTED PRACTICE / 2026</span>
        <button
          className="hero-sound-toggle focus-ring"
          type="button"
          aria-pressed={soundEnabled}
          onClick={toggleSound}
          data-enabled={soundEnabled}
        >
          <span className="hero-sound-bars" aria-hidden="true"><i /><i /><i /></span>
          <span>{soundEnabled ? '声音已开启' : '点击开启声音'}</span>
        </button>
      </div>

      <div
        ref={collageRef}
        className="hero-collage reveal reveal-delay"
        onPointerMove={handlePointerMove}
        onPointerLeave={resetDepth}
        role="tablist"
        aria-label="首屏作品动态预览"
      >
        <span className="hero-collage-word" aria-hidden="true">LIVE WORK</span>
        {heroMedia.map((media, index) => {
          const isActive = activeMedia === index
          const previewIndex = index < activeMedia ? index : index - 1
          const style = { '--preview-index': Math.max(0, previewIndex) } as CSSProperties

          return (
            <button
              className="hero-media-card focus-ring"
              data-active={isActive}
              data-preview={isActive ? undefined : previewIndex}
              data-orientation={media.orientation}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveMedia(index)}
              onPointerEnter={(event) => {
                setActiveMedia(index)
                void activateMediaSound(findVideo(event.currentTarget), media.audioProfile)
              }}
              onPointerDown={(event) => {
                void enableMediaSound(findVideo(event.currentTarget), media.audioProfile)
              }}
              onKeyDown={(event) => enableFromKeyboard(event, index)}
              onPointerLeave={(event) => {
                if (event.pointerType === 'mouse') {
                  deactivateMediaSound(findVideo(event.currentTarget))
                }
              }}
              onFocus={(event) => {
                setActiveMedia(index)
                void activateMediaSound(findVideo(event.currentTarget), media.audioProfile)
              }}
              onBlur={(event) => deactivateMediaSound(findVideo(event.currentTarget))}
              key={media.project}
              style={style}
            >
              <img className="hero-media-ambient" src={media.src} alt="" aria-hidden="true" />
              <video
                className="hero-media-video"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={media.src}
                aria-label={media.alt}
              >
                {media.videoWebm ? <source src={media.videoWebm} type="video/webm" /> : null}
                <source src={media.video} type="video/mp4" />
              </video>

              <span className="hero-card-index">{String(index + 1).padStart(2, '0')}</span>
              <span className="hero-card-caption">
                <small>{media.label}</small>
                <strong>{media.project}</strong>
              </span>
              {isActive ? <span className="hero-live"><i aria-hidden="true" /> LIVE</span> : null}
            </button>
          )
        })}
      </div>
    </section>
  )
}
