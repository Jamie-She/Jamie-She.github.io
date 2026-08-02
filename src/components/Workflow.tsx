import { workflow } from '../data/content'

export function Workflow() {
  return (
    <section className="workflow-section" id="workflow">
      <header className="method-heading method-heading-dark reveal">
        <span>HOW I PUSH IT FORWARD</span>
        <div>
          <h2>长线程任务<br />需要持续保持方向</h2>
          <p>AI可以承担更多执行步骤<br />但关键判断、上下文与质量要求不能在过程中丢失</p>
        </div>
      </header>

      <div className="workflow-sequence reveal reveal-delay">
        <ol>
          {workflow.map((step, index) => (
            <li key={step.title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div>
                {step.term ? <small>{step.term}</small> : null}
                <strong>{step.title}</strong>
                <p>{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="workflow-note">复杂任务不是一次完成，而是在判断、执行与反馈之间持续推进</p>
      </div>
    </section>
  )
}
