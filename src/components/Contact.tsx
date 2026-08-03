import { profile } from '../data/content'
import { ExternalIcon } from './ui'

type QrCardProps = {
  index: string
  label: string
  title: string
  src: string
  account: string
  meta: string
  variant: 'wechat' | 'rednote'
}

function QrCard({ index, label, title, src, account, meta, variant }: QrCardProps) {
  return (
    <article className={`contact-qr-card contact-qr-card--${variant}`}>
      <div className="contact-channel-topline">
        <span>{label}</span>
        <span>{index}</span>
      </div>
      <div className="contact-qr-identity">
        <strong>{account}</strong>
        <small>{meta}</small>
      </div>
      <a
        className="contact-qr-action focus-ring"
        href={src}
        target="_blank"
        rel="noreferrer"
        aria-label={`放大查看${title}二维码`}
      >
        <div className={`contact-qr-crop contact-qr-crop--${variant}`}>
          <img src={src} alt={`${title}二维码`} />
          <span aria-hidden="true" />
        </div>
      </a>
      <div className="contact-qr-caption">
        <span>扫码{variant === 'wechat' ? '添加好友' : '查看主页'}</span>
        <span>
          放大查看
          <ExternalIcon />
        </span>
      </div>
    </article>
  )
}

type DirectCardProps = {
  index: string
  label: string
  value: string
  caption: string
  href: string
  external?: boolean
}

function DirectCard({ index, label, value, caption, href, external }: DirectCardProps) {
  return (
    <a
      className="contact-direct-card focus-ring"
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
    >
      <div className="contact-channel-topline">
        <span>{label}</span>
        <span>{index}</span>
      </div>
      <div className="contact-direct-copy">
        <strong>{value}</strong>
        <small>{caption}</small>
      </div>
      <div className="contact-direct-action" aria-hidden="true">
        <span>OPEN</span>
        <ExternalIcon />
      </div>
    </a>
  )
}

export function Contact() {
  const contact = profile.contact

  return (
    <footer className="contact-section" id="contact">
      <header className="contact-heading reveal">
        <span>CONTACT / KEEP IN TOUCH</span>
        <div>
          <h2>保持联系</h2>
          <p>项目、内容实验或新的合作，都可以从这里开始</p>
        </div>
      </header>

      <div className="contact-grid reveal reveal-delay">
        <div className="contact-direct-stack">
          <DirectCard
            index="01"
            label="EMAIL"
            value={contact.email}
            caption="写邮件给Jamie"
            href={`mailto:${contact.email}`}
          />
          <DirectCard
            index="02"
            label="GITHUB"
            value={contact.githubLabel}
            caption="代码、项目与持续更新"
            href={contact.githubUrl}
            external
          />
        </div>

        <QrCard
          index="03"
          label="WECHAT"
          title="微信"
          src={contact.wechatQr}
          account={contact.wechatLabel}
          meta={contact.wechatMeta}
          variant="wechat"
        />
        <QrCard
          index="04"
          label="REDNOTE"
          title="REDNOTE"
          src={contact.rednoteQr}
          account={contact.rednoteLabel}
          meta={contact.rednoteMeta}
          variant="rednote"
        />
      </div>

      <div className="contact-footer reveal">
        <span>© 2026 Jamie · 佘嘉敏</span>
        <a className="focus-ring" href="#top">回到顶部 ↑</a>
      </div>
    </footer>
  )
}
