import { capabilities, workflow } from '../data/content'

const methodActions = [
  {
    index: '01',
    title: '看清',
    copy: '先理解真实语境与约束，不被表面的答案牵着走',
    term: 'Context Engineering',
  },
  {
    index: '02',
    title: '拆开',
    copy: '把复杂问题拆成可以验证的单元，找到最小可行动点',
    term: 'Agentic Workflow',
  },
  {
    index: '03',
    title: '校正',
    copy: '让反馈持续回到目标，结果需要被看见，也需要被判断',
    term: 'Evals',
  },
]

const capabilityNames = capabilities.map((item) => item.name)

export function Framework() {
  return (
    <section className="method-section" id="framework">
      <div className="method-backdrop" aria-hidden="true" />
      <div className="method-content">
        <header className="method-intro reveal">
          <h2>Prompt会过时<br />判断事情的手感不会</h2>
          <p>方法是可以迁移的判断力<br />让创作在不同模型与语境中仍然保持方向</p>
        </header>

        <div className="method-actions reveal reveal-delay">
          {methodActions.map((item) => (
            <article className="method-action" key={item.index}>
              <span>{item.index}</span>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
              <small>{item.term}</small>
            </article>
          ))}
        </div>

        <div className="method-thread">
          <header className="method-thread-heading reveal">
            <h3>
              让任务一直
              <br />
              接得上
            </h3>
            <p>目标不丢、过程可见、结果能被判断，长线程才有意义</p>
          </header>
          <ol className="method-thread-list reveal reveal-delay">
            {workflow.map((step, index) => (
              <li key={step.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{step.title}</strong>
                <p>{step.description}</p>
                {step.term ? <small>{step.term}</small> : null}
              </li>
            ))}
          </ol>
        </div>

        <div className="capability-ribbon" aria-label="能力方向">
          <div>
            {[...capabilityNames, ...capabilityNames].map((name, index) => (
              <span key={`${name}-${index}`}>{name}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
