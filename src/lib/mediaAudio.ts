import bendShiftPreviewMusic from '../assets/audio/bendshift-preview.m4a'
import fakeAdPreviewMusic from '../assets/audio/fake-ad-preview.m4a'
import insomniaRadioPreviewMusic from '../assets/audio/insomnia-radio-preview.m4a'
import voidDominionPreviewMusic from '../assets/audio/void-dominion-preview.m4a'

export type MediaAudioProfile =
  | 'embedded'
  | 'void'
  | 'bendshift'
  | 'fakead'
  | 'insomnia'

type MusicProfile = Exclude<MediaAudioProfile, 'embedded'>

const mediaSoundChangeEvent = 'media-sound-change'
const musicSources: Record<MusicProfile, string> = {
  void: voidDominionPreviewMusic,
  bendshift: bendShiftPreviewMusic,
  fakead: fakeAdPreviewMusic,
  insomnia: insomniaRadioPreviewMusic,
}
const musicVolumes: Record<MusicProfile, number> = {
  void: 0.76,
  bendshift: 0.9,
  fakead: 0.72,
  insomnia: 0.64,
}

let activeVideo: HTMLVideoElement | null = null
let activeTrack: HTMLAudioElement | null = null
let mediaSoundEnabled = false
let activationToken = 0
const musicTracks = new Map<MusicProfile, HTMLAudioElement>()

function getMusicTrack(profile: MusicProfile) {
  const existing = musicTracks.get(profile)
  if (existing) return existing

  const track = new Audio(musicSources[profile])
  track.loop = true
  track.preload = 'auto'
  track.volume = musicVolumes[profile]
  track.hidden = true
  track.dataset.mediaMusicProfile = profile
  document.body.append(track)
  musicTracks.set(profile, track)
  return track
}

function muteOtherVideos(current: HTMLVideoElement) {
  document.querySelectorAll('video').forEach((video) => {
    if (video !== current) {
      video.muted = true
      delete video.dataset.audioActive
    }
  })
}

function pauseMusic(reset = false) {
  musicTracks.forEach((track) => {
    track.pause()
    if (reset) track.currentTime = 0
  })
  activeTrack = null
}

function emitMediaSoundChange() {
  window.dispatchEvent(new CustomEvent(mediaSoundChangeEvent, {
    detail: { enabled: mediaSoundEnabled },
  }))
}

export function isMediaSoundEnabled() {
  return mediaSoundEnabled
}

export function subscribeMediaSound(listener: (enabled: boolean) => void) {
  const handleChange = (event: Event) => {
    listener((event as CustomEvent<{ enabled: boolean }>).detail.enabled)
  }

  window.addEventListener(mediaSoundChangeEvent, handleChange)
  return () => window.removeEventListener(mediaSoundChangeEvent, handleChange)
}

export async function activateMediaSound(
  video: HTMLVideoElement | null,
  profile: MediaAudioProfile = 'embedded',
) {
  if (!video || !mediaSoundEnabled) return

  muteOtherVideos(video)

  if (activeVideo === video) {
    if (profile === 'embedded' && !video.muted) return
    if (profile !== 'embedded') {
      const track = getMusicTrack(profile)
      if (activeTrack === track && !track.paused) return
    }
  }

  const token = ++activationToken

  if (activeVideo && activeVideo !== video) {
    activeVideo.muted = true
    delete activeVideo.dataset.audioActive
  }

  pauseMusic()
  activeVideo = video
  video.dataset.audioActive = 'true'
  delete document.documentElement.dataset.audioError

  try {
    if (profile === 'embedded') {
      video.volume = 0.72
      video.muted = false
      await video.play()
      if (token !== activationToken || activeVideo !== video) return
      document.documentElement.dataset.audioMode = 'video'
      return
    }

    const track = getMusicTrack(profile)
    activeTrack = track
    video.muted = true
    track.currentTime = 0
    await Promise.all([video.play(), track.play()])

    if (token !== activationToken || activeVideo !== video) {
      track.pause()
      return
    }
    document.documentElement.dataset.audioMode = `music:${profile}`
  } catch (error) {
    video.muted = true
    pauseMusic()
    delete video.dataset.audioActive
    delete document.documentElement.dataset.audioMode
    document.documentElement.dataset.audioError =
      error instanceof Error ? `${error.name}: ${error.message}` : 'Playback unavailable'
    if (activeVideo === video) activeVideo = null
  }
}

export function enableMediaSound(
  video: HTMLVideoElement | null,
  profile: MediaAudioProfile = 'embedded',
) {
  if (!mediaSoundEnabled) {
    mediaSoundEnabled = true
    emitMediaSoundChange()
  }

  return activateMediaSound(video, profile)
}

export function disableMediaSound() {
  mediaSoundEnabled = false
  activationToken += 1
  document.querySelectorAll('video').forEach((video) => {
    video.muted = true
    delete video.dataset.audioActive
  })
  pauseMusic(true)
  activeVideo = null
  delete document.documentElement.dataset.audioMode
  delete document.documentElement.dataset.audioError
  emitMediaSoundChange()
}

export function deactivateMediaSound(video: HTMLVideoElement | null) {
  if (!video || activeVideo !== video) return

  activationToken += 1
  video.muted = true
  delete video.dataset.audioActive
  pauseMusic()
  delete document.documentElement.dataset.audioMode
  activeVideo = null
}
