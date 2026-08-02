import { useState } from 'react'
import { capabilities } from '../data/content'

const selectedCapabilityIndexes = [0, 1, 3, 4]

export function Capabilities() {
  const [activeCapability, setActiveCapability] = useState(0)
  const active = capabilities[activeCapability]

  return (
    <section className="capabilities-section" id="capabilities">
      <header className="method-heading reveal">
        <span>HOW I WORK</span>
        <div>
          <h2>让判断、内容与运营<br />在一条链路里工作</h2>
          <p>从策略判断到内容供给，再到上线后的反馈与运营<br />不同能力通常在同一个项目中共同发生</p>
        </div>
      </header>

      <div className="capability-editorial reveal">
        <div className="capability-list">
          {selectedCapabilityIndexes.map((index) => {
            const capability = capabilities[index]
            return (
            <button
              key={capability.name}
              className="capability-term focus-ring"
              type="button"
              data-emphasis={capability.emphasis}
              data-active={activeCapability === index}
              onMouseEnter={() => setActiveCapability(index)}
              onFocus={() => setActiveCapability(index)}
              onClick={() => setActiveCapability(index)}
              aria-pressed={activeCapability === index}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              <span className="capability-term-copy">
                {capability.term ? <em>{capability.term}</em> : null}
                <strong>{capability.name}</strong>
                <small>{capability.description}</small>
              </span>
            </button>
            )
          })}
        </div>

        <aside className="capability-detail" aria-live="polite">
          <span>{active.term ?? 'WORKING PRINCIPLE'}</span>
          <strong>{active.name}</strong>
          <p>{active.description}</p>
        </aside>
      </div>
    </section>
  )
}
