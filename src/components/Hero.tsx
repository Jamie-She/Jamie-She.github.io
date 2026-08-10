import { useEffect, useMemo, useRef, useState } from 'react'
import { heroMedia, profile } from '../data/content'
import {
  activateMediaSound,
  deactivateMediaSound,
  disableMediaSound,
  enableMediaSound,
  isMediaSoundEnabled,
  subscribeMediaSound,
} from '../lib/mediaAudio'

const heroOrder = [2, 1, 0, 3]

export function Hero() {
  const projects = useMemo(() => heroOrder.map((index) => heroMedia[index]), [])
  const [activeIndex, setActiveIndex] = useState(0)
  const [soundEnabled, setSoundEnabled] = useState(isMediaSoundEnabled)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => subscribeMediaSound(setSoundEnabled), [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.currentTime = 0
    void video.play().catch(() => undefined)
    if (soundEnabled) void activateMediaSound(video, projects[activeIndex].audioProfile)
  }, [activeIndex, projects, soundEnabled])

  const toggleSound = () => {
    if (soundEnabled) {
      disableMediaSound()
      return
    }
    void enableMediaSound(videoRef.current, projects[activeIndex].audioProfile)
  }

  return (
    <section
      className="hero-section"
      id="top"
      onPointerLeave={() => deactivateMediaSound(videoRef.current)}
    >
      <div className="hero-grain" aria-hidden="true" />

      <div className="hero-copy reveal">
        <h1>
          <span>我是Jamie</span>
          <span>和AI一起做内容与互动体验</span>
        </h1>
        <p>{profile.heroDescription}</p>
      </div>

      <div className="hero-contact-sheet" aria-label="精选实践">
        {projects.map((project, index) => {
          const active = index === activeIndex
          return (
            <button
              className="hero-aperture focus-ring"
              type="button"
              data-active={active}
              data-orientation={project.orientation}
              aria-pressed={active}
              onPointerEnter={() => {
                setActiveIndex(index)
                if (active && soundEnabled) {
                  void activateMediaSound(videoRef.current, project.audioProfile)
                }
              }}
              onFocus={() => {
                setActiveIndex(index)
                if (active && soundEnabled) {
                  void activateMediaSound(videoRef.current, project.audioProfile)
                }
              }}
              onClick={() => {
                setActiveIndex(index)
                if (active) void enableMediaSound(videoRef.current, project.audioProfile)
              }}
              key={project.project}
            >
              <img src={project.src} alt="" aria-hidden="true" />
              {active ? (
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster={project.src}
                  aria-label={project.alt}
                >
                  {project.videoWebm ? <source src={project.videoWebm} type="video/webm" /> : null}
                  <source src={project.video} type="video/mp4" />
                </video>
              ) : null}
              <span className="hero-aperture-shade" aria-hidden="true" />
              <span className="hero-aperture-index">0{index + 1}</span>
              <span className="hero-aperture-caption">
                <small>{project.label}</small>
                <strong>{project.project}</strong>
              </span>
            </button>
          )
        })}
      </div>

      <div className="hero-controls">
        <span>{String(activeIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span>
        <button
          className="hero-sound-toggle focus-ring"
          type="button"
          aria-pressed={soundEnabled}
          onClick={toggleSound}
        >
          <span className="sound-bars" aria-hidden="true"><i /><i /><i /></span>
          {soundEnabled ? '关闭声音' : '开启声音'}
        </button>
      </div>
    </section>
  )
}
