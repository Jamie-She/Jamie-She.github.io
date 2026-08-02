import { profile } from '../data/content'
import { ExternalIcon } from './ui'

type QrCardProps = {
  index: string
  label: string
  title: string
  src: string
}

function QrCard({ index, label, title, src }: QrCardProps) {
  return (
    <article className="contact-channel contact-channel-qr">
      <div className="contact-channel-topline">
        <span>{label}</span>
        <span>{index}</span>
      </div>
      <div className="contact-qr-frame" data-empty={!src}>
        {src ? (
          <img src={src} alt={`${title}二维码`} />
        ) : (
          <div className="contact-qr-placeholder" aria-label={`${title}二维码占位`}>
            <i aria-hidden="true" />
            <span>ADD QR</span>
          </div>
        )}
      </div>
      <div className="contact-channel-copy">
        <strong>{title}</strong>
        <small>{src ? '扫码添加' : `替换为${title}二维码`}</small>
      </div>
    </article>
  )
}

export function Contact() {
  const contact = profile.contact

  return (
    <footer className="contact-section" id="contact">
      <header className="contact-heading reveal">
        <span>CONTACT / KEEP IN TOUCH</span>
        <div>
          <h2>联系方式</h2>
          <p>邮箱、微信、小红书和GitHub都预留在这里</p>
        </div>
      </header>

      <div className="contact-grid reveal reveal-delay">
        <a className="contact-channel focus-ring" href={`mailto:${contact.email}`}>
          <div className="contact-channel-topline">
            <span>EMAIL</span>
            <span>01</span>
          </div>
          <div className="contact-channel-copy">
            <strong>{contact.email}</strong>
            <small>点击发送邮件</small>
          </div>
          <ExternalIcon />
        </a>

        <a
          className="contact-channel focus-ring"
          href={contact.githubUrl}
          target="_blank"
          rel="noreferrer"
        >
          <div className="contact-channel-topline">
            <span>GITHUB</span>
            <span>02</span>
          </div>
          <div className="contact-channel-copy">
            <strong>{contact.githubLabel}</strong>
            <small>查看代码与项目</small>
          </div>
          <ExternalIcon />
        </a>

        <QrCard index="03" label="WECHAT" title="微信" src={contact.wechatQr} />
        <QrCard index="04" label="XIAOHONGSHU" title="小红书" src={contact.xiaohongshuQr} />
      </div>

      <div className="contact-footer reveal">
        <span>© 2026 Jamie · 佘嘉敏</span>
        <a className="focus-ring" href="#top">回到顶部 ↑</a>
      </div>
    </footer>
  )
}
