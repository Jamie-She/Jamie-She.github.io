import { workflow } from '../data/content'

const workflowGroups = [
  { label: 'DEFINE', title: '把问题说清楚', steps: workflow.slice(0, 2) },
  { label: 'MOVE', title: '让任务往前走', steps: workflow.slice(2, 5) },
  { label: 'CHECK', title: '看结果，也看偏差', steps: workflow.slice(5) },
]

export function Workflow() {
  return (
    <section className="workflow-section" id="workflow">
      <header className="method-heading method-heading-dark reveal">
        <span>TASK THREAD</span>
        <div>
          <h2>长线程不是更长的对话<br />而是每一步都接得上</h2>
          <p>目标、上下文和质量标准需要一直可见<br />AI才不只是在局部做对</p>
        </div>
      </header>

      <div className="workflow-sequence reveal reveal-delay">
        <div className="workflow-groups">
          {workflowGroups.map((group, groupIndex) => (
            <article className="workflow-group" key={group.label}>
              <header>
                <span>{String(groupIndex + 1).padStart(2, '0')} / {group.label}</span>
                <h3>{group.title}</h3>
              </header>
              <ol>
                {group.steps.map((step) => (
                  <li key={step.title}>
                    <strong>{step.title}</strong>
                    <p>{step.description}</p>
                    {step.term ? <small>{step.term}</small> : null}
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </div>
        <p className="workflow-note">目标不丢、过程可见、结果能被判断，长线程才有意义</p>
      </div>
    </section>
  )
}
