import { framework } from '../data/content'

export function Framework() {
  return (
    <section className="framework-section" id="framework">
      <header className="method-heading reveal">
        <span>WHAT I KEEP</span>
        <div>
          <h2>比Prompt更值得留下的<br />是判断本身</h2>
          <p>具体写法会随模型变化<br />为什么这样选择，怎样算足够好，更值得被记录</p>
        </div>
      </header>

      <div className="framework-grid reveal reveal-delay">
        {framework.map((item, index) => (
          <article
            className="framework-card"
            key={item.level}
            data-level={item.level}
            data-final={index === framework.length - 1}
          >
            <span className="framework-card-index">{item.level}</span>
            <div className="framework-card-copy">
              <small>{item.english}</small>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <span>{item.evidence}</span>
            </div>
            <i aria-hidden="true">{index < framework.length - 1 ? '—' : '●'}</i>
          </article>
        ))}
      </div>
    </section>
  )
}
