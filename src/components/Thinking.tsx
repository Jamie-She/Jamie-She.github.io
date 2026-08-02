import { notes } from '../data/content'
import { ArrowIcon } from './ui'

export function Thinking() {
  return (
    <section className="thinking-section" id="thinking">
      <header className="thinking-heading reveal">
        <span>THINKING / NOTES</span>
        <h2><span>最近反复想到的</span><span>3件事</span></h2>
      </header>

      <div className="notes-list reveal">
        {notes.map((note, index) => (
          <article className="note-row" key={note.title}>
            <div className="note-meta">
              <span>{String(index + 1).padStart(2, '0')} / {note.date}</span>
              <span>{note.category}</span>
            </div>
            <div className="note-copy">
              <h3>{note.title}</h3>
              <div className="note-detail">
                <p>{note.summary}</p>
                <p className="note-after">{note.takeaway}</p>
              </div>
            </div>
            <span className="note-arrow"><ArrowIcon /></span>
          </article>
        ))}
      </div>
    </section>
  )
}
