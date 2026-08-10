import { profile } from '../data/content'
import { ExternalIcon } from './ui'

function QrPaper({
  label,
  account,
  src,
  title,
}: {
  label: string
  account: string
  src: string
  title: string
}) {
  return (
    <a className="qr-paper focus-ring" href={src} target="_blank" rel="noreferrer">
      <span>{label}</span>
      <img src={src} alt={`${title}二维码`} />
      <small>{account}</small>
    </a>
  )
}

export function Contact() {
  const contact = profile.contact

  return (
    <footer className="contact-section" id="contact">
      <div className="contact-inner">
        <header className="contact-heading reveal">
          <h2>一起做点新东西</h2>
          <p>项目、内容实验或新的合作，欢迎聊聊~</p>
        </header>

        <div className="contact-content reveal reveal-delay">
          <div className="contact-links">
            <a className="contact-link focus-ring" href={`mailto:${contact.email}`}>
              <span>EMAIL</span>
              <strong>{contact.email}</strong>
              <ExternalIcon />
            </a>
            <a
              className="contact-link focus-ring"
              href={contact.githubUrl}
              target="_blank"
              rel="noreferrer"
            >
              <span>GITHUB</span>
              <strong>{contact.githubLabel}</strong>
              <ExternalIcon />
            </a>
          </div>

          <div className="contact-qrs">
            <QrPaper
              label="WECHAT"
              account={contact.wechatLabel}
              src={contact.wechatQr}
              title="微信"
            />
          </div>
        </div>

        <div className="contact-footer reveal">
          <span>JAMIE / 2026</span>
          <a className="focus-ring" href="#top">回到顶部</a>
        </div>
      </div>
    </footer>
  )
}
