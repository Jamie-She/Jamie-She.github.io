import { notes } from '../data/content'

export function Thinking() {
  return (
    <section className="thinking-section" id="thinking">
      <div className="thinking-paper">
        <header className="thinking-heading reveal">
          <h2>
            最近反复想的<span className="no-break">3件事</span>
          </h2>
          <span>THINKING / NOTES</span>
        </header>

        <div className="notes-list reveal reveal-delay">
          {notes.map((note, index) => (
            <article className="note-row" key={note.title}>
              <div className="note-meta">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <span>{note.category}</span>
              </div>
              <h3>{note.title}</h3>
              <div className="note-detail">
                <p>{note.summary}</p>
                <p>{note.takeaway}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
