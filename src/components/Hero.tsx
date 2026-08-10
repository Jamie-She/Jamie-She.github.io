import { type PointerEvent, useEffect, useRef, useState } from 'react'
import bendshiftKeyVisual from '../assets/practice/bendshift-cinematic-keyvisual.webp'
import { heroMedia, practiceStages, profile } from '../data/content'
import {
  activateMediaSound,
  deactivateMediaSound,
  disableMediaSound,
  enableMediaSound,
  isMediaSoundEnabled,
  subscribeMediaSound,
} from '../lib/mediaAudio'

const heroProject = heroMedia[2]

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)
  const [soundEnabled, setSoundEnabled] = useState(isMediaSoundEnabled)
  const [motionActive, setMotionActive] = useState(false)

  useEffect(() => subscribeMediaSound(setSoundEnabled), [])

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse') return
    if (!motionActive) setMotionActive(true)
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width - 0.5
    const y = (event.clientY - bounds.top) / bounds.height - 0.5
    event.currentTarget.style.setProperty('--scene-x', x.toFixed(3))
    event.currentTarget.style.setProperty('--scene-y', y.toFixed(3))
  }

  const handlePointerLeave = () => {
    sceneRef.current?.style.setProperty('--scene-x', '0')
    sceneRef.current?.style.setProperty('--scene-y', '0')
    setMotionActive(false)
    deactivateMediaSound(videoRef.current)
  }

  const toggleSound = () => {
    if (soundEnabled) {
      disableMediaSound()
      return
    }
    setMotionActive(true)
    void enableMediaSound(videoRef.current, heroProject.audioProfile)
  }

  return (
    <section className="hero-section" id="top">
      <div
        ref={sceneRef}
        className="hero-scene"
        data-motion={motionActive}
        onPointerMove={handlePointerMove}
        onPointerEnter={() => {
          setMotionActive(true)
          void activateMediaSound(videoRef.current, heroProject.audioProfile)
        }}
        onPointerDown={(event) => {
          setMotionActive(true)
          if (event.pointerType === 'mouse') {
            void enableMediaSound(videoRef.current, heroProject.audioProfile)
          }
        }}
        onPointerLeave={handlePointerLeave}
      >
        <img className="hero-scene-poster" src={bendshiftKeyVisual} alt="" aria-hidden="true" />
        <video
          ref={videoRef}
          className="hero-scene-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={heroProject.src}
          aria-label={heroProject.alt}
        >
          <source src={heroProject.video} type="video/mp4" />
        </video>
        <div className="hero-scene-vignette" aria-hidden="true" />
        <div className="hero-scene-grain" aria-hidden="true" />

        <div className="hero-copy reveal">
          <p className="hero-project-line"><i aria-hidden="true" />BENDSHIFT / LIVE WORK</p>
          <h1>
            <span>我是Jamie</span>
            <span>和AI一起做内容与互动体验</span>
          </h1>
          <p className="hero-description">{profile.heroDescription}</p>
        </div>

        <div className="hero-project-meta" aria-label="当前展示项目">
          <span>RACING GAME</span>
          <strong>不许控车 BENDSHIFT</strong>
          <small>移动光标，影像与声音会回应</small>
        </div>

        <nav className="hero-stage-trace" aria-label="实践演进">
          {practiceStages.map((stage) => (
            <a className="hero-stage-link focus-ring" href={`#practice-stage-${stage.phase}`} key={stage.phase}>
              <span>{stage.phase}</span>
              <strong>{stage.title}</strong>
              {stage.current ? <small>NOW</small> : null}
            </a>
          ))}
        </nav>

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
          <span>{soundEnabled ? '声音开启' : '开启声音'}</span>
        </button>
      </div>
    </section>
  )
}
