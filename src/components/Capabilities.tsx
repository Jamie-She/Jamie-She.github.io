import { capabilities } from '../data/content'

const selectedCapabilityIndexes = [0, 1, 3, 4]

export function Capabilities() {
  return (
    <section className="capabilities-section" id="capabilities">
      <header className="method-heading reveal">
        <span>WORKING RANGE</span>
        <div>
          <h2>从判断到上线<br />不把它们拆开看</h2>
          <p>内容怎么做、体验怎么成立、上线后发生什么<br />这些判断常常在同一个项目里同时出现</p>
        </div>
      </header>

      <div className="capability-editorial reveal">
        <div className="capability-list">
          {selectedCapabilityIndexes.map((index, displayIndex) => {
            const capability = capabilities[index]
            return (
            <article
              key={capability.name}
              className="capability-term"
              data-emphasis={capability.emphasis}
            >
              <span>{String(displayIndex + 1).padStart(2, '0')}</span>
              <span className="capability-term-copy">
                {capability.term ? <em>{capability.term}</em> : null}
                <strong>{capability.name}</strong>
                <small>{capability.description}</small>
              </span>
            </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
