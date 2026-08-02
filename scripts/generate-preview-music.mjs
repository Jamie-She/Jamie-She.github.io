import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'

const sampleRate = 44_100
const duration = 15
const frameCount = sampleRate * duration
const outputDirectory = resolve('src/assets/audio')

function createTrack() {
  return {
    left: new Float64Array(frameCount),
    right: new Float64Array(frameCount),
  }
}

function oscillator(type, phase) {
  const normalized = (phase / (Math.PI * 2)) % 1
  if (type === 'triangle') return 2 * Math.abs(2 * normalized - 1) - 1
  if (type === 'saw') return 2 * normalized - 1
  if (type === 'square') return normalized < 0.5 ? 1 : -1
  return Math.sin(phase)
}

function addTone(track, {
  start,
  length,
  frequency,
  endFrequency = frequency,
  amplitude,
  type = 'sine',
  attack = 0.02,
  release = 0.12,
  pan = 0,
}) {
  const startFrame = Math.max(0, Math.floor(start * sampleRate))
  const endFrame = Math.min(frameCount, Math.floor((start + length) * sampleRate))
  const leftPan = Math.cos((pan + 1) * Math.PI * 0.25)
  const rightPan = Math.sin((pan + 1) * Math.PI * 0.25)

  for (let frame = startFrame; frame < endFrame; frame += 1) {
    const time = (frame - startFrame) / sampleRate
    const progress = time / length
    const phase = Math.PI * 2 * (
      frequency * time + ((endFrequency - frequency) * time * time) / (2 * length)
    )
    const attackEnvelope = Math.min(1, time / Math.max(attack, 0.001))
    const releaseEnvelope = Math.min(1, (length - time) / Math.max(release, 0.001))
    const envelope = Math.max(0, Math.min(attackEnvelope, releaseEnvelope))
    const value = oscillator(type, phase) * amplitude * envelope * envelope
    track.left[frame] += value * leftPan
    track.right[frame] += value * rightPan
  }
}

function addKick(track, start, amplitude = 0.32) {
  addTone(track, {
    start,
    length: 0.22,
    frequency: 118,
    endFrequency: 42,
    amplitude,
    attack: 0.004,
    release: 0.18,
  })
}

let randomState = 0x5eeda11
function random() {
  randomState = (randomState * 1664525 + 1013904223) >>> 0
  return randomState / 0xffffffff
}

function addNoise(track, {
  start,
  length,
  amplitude,
  pan = 0,
  brightness = 0.72,
}) {
  const startFrame = Math.max(0, Math.floor(start * sampleRate))
  const endFrame = Math.min(frameCount, Math.floor((start + length) * sampleRate))
  const leftPan = Math.cos((pan + 1) * Math.PI * 0.25)
  const rightPan = Math.sin((pan + 1) * Math.PI * 0.25)
  let previous = 0

  for (let frame = startFrame; frame < endFrame; frame += 1) {
    const time = (frame - startFrame) / sampleRate
    const envelope = Math.pow(Math.max(0, 1 - time / length), 2.2)
    const white = random() * 2 - 1
    const highPassed = white - previous * (1 - brightness)
    previous = white
    const value = highPassed * amplitude * envelope
    track.left[frame] += value * leftPan
    track.right[frame] += value * rightPan
  }
}

function addNoiseBed(track, {
  start,
  length,
  amplitude,
  warmth = 0.96,
}) {
  const startFrame = Math.max(0, Math.floor(start * sampleRate))
  const endFrame = Math.min(frameCount, Math.floor((start + length) * sampleRate))
  let filtered = 0

  for (let frame = startFrame; frame < endFrame; frame += 1) {
    const time = (frame - startFrame) / sampleRate
    const fadeIn = Math.min(1, time / 0.8)
    const fadeOut = Math.min(1, (length - time) / 0.8)
    filtered = filtered * warmth + (random() * 2 - 1) * (1 - warmth)
    const value = filtered * amplitude * Math.max(0, Math.min(fadeIn, fadeOut))
    track.left[frame] += value * 0.72
    track.right[frame] += value * 0.72
  }
}

function addDelay(track, seconds, amount, cross = false) {
  const delayFrames = Math.floor(seconds * sampleRate)
  const dryLeft = track.left.slice()
  const dryRight = track.right.slice()

  for (let frame = delayFrames; frame < frameCount; frame += 1) {
    track.left[frame] += (cross ? dryRight : dryLeft)[frame - delayFrames] * amount
    track.right[frame] += (cross ? dryLeft : dryRight)[frame - delayFrames] * amount
  }
}

function addPad(track, root, start, length, amplitude) {
  addTone(track, {
    start,
    length,
    frequency: root,
    amplitude,
    attack: 0.55,
    release: 0.7,
    pan: -0.25,
  })
  addTone(track, {
    start,
    length,
    frequency: root * 1.5,
    amplitude: amplitude * 0.42,
    type: 'triangle',
    attack: 0.7,
    release: 0.8,
    pan: 0.3,
  })
}

function createVoidDominionTrack() {
  const track = createTrack()
  const beat = duration / 32
  const bassRoots = [61.74, 49, 73.42, 55]
  const chords = [
    [246.94, 293.66, 369.99],
    [196, 246.94, 293.66],
    [293.66, 369.99, 440],
    [220, 277.18, 329.63],
  ]
  const hooks = [
    [739.99, 659.25, 587.33, 493.88, 587.33, 659.25, 739.99, 880],
    [739.99, 659.25, 587.33, 493.88, 587.33, 659.25, 587.33, 493.88],
  ]

  for (let bar = 0; bar < 8; bar += 1) {
    const barStart = bar * beat * 4
    const progression = bar % 4
    const root = bassRoots[progression]
    const chord = chords[progression]
    const hook = hooks[Math.floor(bar / 4)]

    // Four-on-the-floor drums and off-beat hats give the loop a pop pulse
    for (let beatInBar = 0; beatInBar < 4; beatInBar += 1) {
      const beatStart = barStart + beatInBar * beat
      addKick(track, beatStart, beatInBar === 0 ? 0.48 : 0.42)

      if (beatInBar === 1 || beatInBar === 3) {
        addNoise(track, {
          start: beatStart,
          length: 0.14,
          amplitude: 0.17,
          brightness: 0.82,
        })
        addTone(track, {
          start: beatStart,
          length: 0.12,
          frequency: 180,
          endFrequency: 108,
          amplitude: 0.08,
          type: 'triangle',
          attack: 0.003,
          release: 0.1,
        })
      }

      addNoise(track, {
        start: beatStart + beat * 0.5,
        length: 0.055,
        amplitude: 0.085,
        pan: beatInBar % 2 === 0 ? -0.28 : 0.28,
        brightness: 0.96,
      })
    }

    // Short off-beat chord stabs create a side-chained, forward-moving feel
    for (let pulse = 0; pulse < 8; pulse += 1) {
      const pulseStart = barStart + pulse * beat * 0.5
      chord.forEach((frequency, chordNote) => {
        addTone(track, {
          start: pulseStart + beat * 0.07,
          length: beat * 0.34,
          frequency,
          endFrequency: frequency * 0.997,
          amplitude: pulse % 2 === 1 ? 0.055 : 0.035,
          type: chordNote === 1 ? 'triangle' : 'saw',
          attack: beat * 0.055,
          release: beat * 0.22,
          pan: (chordNote - 1) * 0.38,
        })
      })
    }

    // Syncopated bass keeps the track energetic without masking the footage
    const bassPattern = [0, 0.75, 1.5, 2, 2.75, 3.5]
    bassPattern.forEach((offset, note) => {
      addTone(track, {
        start: barStart + offset * beat,
        length: beat * (note === 0 ? 0.54 : 0.32),
        frequency: note === 4 ? root * 1.5 : root,
        endFrequency: root * 0.96,
        amplitude: note === 0 || note === 3 ? 0.19 : 0.145,
        type: 'saw',
        attack: 0.006,
        release: beat * 0.25,
      })
    })

    // A compact eight-note hook repeats with a small variation in the second half
    hook.forEach((frequency, note) => {
      const octaveLift = (bar === 3 || bar === 7) && note >= 6 ? 2 : 1
      addTone(track, {
        start: barStart + note * beat * 0.5,
        length: beat * (note === 7 ? 0.56 : 0.28),
        frequency: frequency * octaveLift,
        endFrequency: frequency * octaveLift * 0.996,
        amplitude: note === 0 || note === 4 ? 0.105 : 0.075,
        type: 'triangle',
        attack: 0.008,
        release: beat * 0.2,
        pan: note % 2 === 0 ? -0.24 : 0.24,
      })
    })

    if (bar === 3 || bar === 7) {
      for (let fill = 0; fill < 4; fill += 1) {
        addNoise(track, {
          start: barStart + beat * (3 + fill * 0.25),
          length: 0.07,
          amplitude: 0.085 + fill * 0.018,
          pan: fill % 2 === 0 ? -0.22 : 0.22,
          brightness: 0.9,
        })
      }
    }
  }

  addDelay(track, beat * 0.75, 0.13, true)
  addDelay(track, beat * 1.5, 0.055)
  return track
}

function createBendShiftTrack() {
  const track = createTrack()
  const beat = 60 / 128
  const step = beat / 4
  const roots = [55, 65.41, 73.42, 49]
  const arpeggio = [1, 1.5, 2, 1.5, 2.378, 2, 1.5, 2.67]

  for (let bar = 0; bar < 8; bar += 1) {
    const barStart = bar * beat * 4
    const root = roots[bar % roots.length]
    addPad(track, root * 2, barStart, beat * 4, 0.045)

    for (let subdivision = 0; subdivision < 16; subdivision += 1) {
      const noteStart = barStart + subdivision * step
      const beatIndex = subdivision % 4
      addTone(track, {
        start: noteStart,
        length: step * 0.82,
        frequency: root * arpeggio[subdivision % arpeggio.length] * 2,
        amplitude: beatIndex === 0 ? 0.07 : 0.045,
        type: 'square',
        attack: 0.006,
        release: step * 0.58,
        pan: subdivision % 2 === 0 ? -0.28 : 0.28,
      })

      if (subdivision % 2 === 1) {
        addNoise(track, {
          start: noteStart,
          length: 0.045,
          amplitude: 0.035,
          pan: subdivision % 4 === 1 ? -0.25 : 0.25,
          brightness: 0.92,
        })
      }
    }

    for (let beatInBar = 0; beatInBar < 4; beatInBar += 1) {
      const beatStart = barStart + beatInBar * beat
      addKick(track, beatStart, beatInBar === 0 ? 0.38 : 0.31)
      addTone(track, {
        start: beatStart,
        length: beat * 0.72,
        frequency: root,
        endFrequency: root * 0.92,
        amplitude: 0.17,
        type: 'saw',
        attack: 0.008,
        release: beat * 0.58,
      })

      if (beatInBar === 1 || beatInBar === 3) {
        addNoise(track, {
          start: beatStart,
          length: 0.16,
          amplitude: 0.15,
          brightness: 0.7,
        })
      }
    }
  }

  addDelay(track, step * 3, 0.14, true)
  addDelay(track, beat, 0.06)
  return track
}

function createFakeAdTrack() {
  const track = createTrack()
  const beat = 60 / 120
  const melody = [523.25, 659.25, 783.99, 880, 783.99, 659.25, 587.33, 783.99]
  const roots = [65.41, 73.42, 87.31, 98]

  for (let bar = 0; bar < 7; bar += 1) {
    const barStart = bar * beat * 4
    const root = roots[bar % roots.length]

    for (let step = 0; step < 8; step += 1) {
      const noteStart = barStart + step * beat * 0.5
      addTone(track, {
        start: noteStart,
        length: beat * 0.28,
        frequency: melody[(step + bar * 2) % melody.length],
        amplitude: step % 4 === 0 ? 0.13 : 0.085,
        type: 'square',
        attack: 0.004,
        release: beat * 0.22,
        pan: step % 2 === 0 ? -0.38 : 0.38,
      })
      if (step % 2 === 0) {
        addTone(track, {
          start: noteStart,
          length: 0.18,
          frequency: root * 2,
          endFrequency: root * 1.3,
          amplitude: 0.12,
          type: 'triangle',
          attack: 0.005,
          release: 0.14,
        })
      }
    }

    addKick(track, barStart, 0.28)
    addKick(track, barStart + beat * 2, 0.24)
    addNoise(track, {
      start: barStart + beat,
      length: 0.09,
      amplitude: 0.11,
      brightness: 0.88,
    })
    addNoise(track, {
      start: barStart + beat * 3,
      length: 0.09,
      amplitude: 0.11,
      brightness: 0.88,
    })

    if (bar % 2 === 1) {
      ;[1046.5, 1318.51, 1567.98].forEach((frequency, chordNote) => {
        addTone(track, {
          start: barStart + beat * 3.45,
          length: 0.42,
          frequency,
          endFrequency: frequency * 1.04,
          amplitude: 0.065,
          type: 'sine',
          attack: 0.006 + chordNote * 0.008,
          release: 0.34,
          pan: (chordNote - 1) * 0.28,
        })
      })
    }
  }

  addDelay(track, 0.125, 0.13, true)
  addDelay(track, 0.25, 0.06)
  return track
}

function createInsomniaRadioTrack() {
  const track = createTrack()
  const chimes = [293.66, 440, 349.23, 523.25, 392, 440]

  addNoiseBed(track, { start: 0, length: duration, amplitude: 0.13, warmth: 0.985 })
  addPad(track, 36.71, 0, duration, 0.105)
  addPad(track, 55, 0, duration, 0.045)

  for (let index = 0; index < chimes.length; index += 1) {
    const start = 0.9 + index * 2.35
    addTone(track, {
      start,
      length: 1.45,
      frequency: chimes[index],
      endFrequency: chimes[index] * 0.997,
      amplitude: 0.082,
      type: 'sine',
      attack: 0.025,
      release: 1.25,
      pan: index % 2 === 0 ? -0.45 : 0.45,
    })
    addTone(track, {
      start: start + 0.08,
      length: 1.1,
      frequency: chimes[index] * 2,
      amplitude: 0.026,
      type: 'sine',
      attack: 0.02,
      release: 0.95,
      pan: index % 2 === 0 ? 0.2 : -0.2,
    })
  }

  for (let sweep = 0; sweep < 4; sweep += 1) {
    const start = 2.45 + sweep * 3.25
    addNoise(track, {
      start,
      length: 0.5,
      amplitude: 0.045,
      pan: sweep % 2 === 0 ? -0.4 : 0.4,
      brightness: 0.56,
    })
    addTone(track, {
      start: start + 0.05,
      length: 0.6,
      frequency: sweep % 2 === 0 ? 220 : 680,
      endFrequency: sweep % 2 === 0 ? 780 : 260,
      amplitude: 0.032,
      type: 'sine',
      attack: 0.06,
      release: 0.24,
      pan: sweep % 2 === 0 ? -0.35 : 0.35,
    })
  }

  addDelay(track, 0.42, 0.2, true)
  addDelay(track, 0.84, 0.08)
  return track
}

function writeWav(filename, track) {
  let peak = 0
  for (let frame = 0; frame < frameCount; frame += 1) {
    peak = Math.max(peak, Math.abs(track.left[frame]), Math.abs(track.right[frame]))
  }

  const gain = peak > 0 ? 0.92 / peak : 1
  const bytesPerFrame = 4
  const dataSize = frameCount * bytesPerFrame
  const buffer = Buffer.alloc(44 + dataSize)
  buffer.write('RIFF', 0)
  buffer.writeUInt32LE(36 + dataSize, 4)
  buffer.write('WAVE', 8)
  buffer.write('fmt ', 12)
  buffer.writeUInt32LE(16, 16)
  buffer.writeUInt16LE(1, 20)
  buffer.writeUInt16LE(2, 22)
  buffer.writeUInt32LE(sampleRate, 24)
  buffer.writeUInt32LE(sampleRate * bytesPerFrame, 28)
  buffer.writeUInt16LE(bytesPerFrame, 32)
  buffer.writeUInt16LE(16, 34)
  buffer.write('data', 36)
  buffer.writeUInt32LE(dataSize, 40)

  for (let frame = 0; frame < frameCount; frame += 1) {
    const left = Math.tanh(track.left[frame] * gain * 1.18)
    const right = Math.tanh(track.right[frame] * gain * 1.18)
    buffer.writeInt16LE(Math.round(left * 32767), 44 + frame * 4)
    buffer.writeInt16LE(Math.round(right * 32767), 46 + frame * 4)
  }

  writeFileSync(resolve(outputDirectory, filename), buffer)
}

mkdirSync(dirname(resolve(outputDirectory, 'preview.wav')), { recursive: true })
writeWav('void-dominion-instrumental-fallback.wav', createVoidDominionTrack())
writeWav('bendshift-instrumental-fallback.wav', createBendShiftTrack())
writeWav('fake-ad-preview.wav', createFakeAdTrack())
writeWav('insomnia-radio-preview.wav', createInsomniaRadioTrack())
