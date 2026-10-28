import { useState } from 'react'
import '../styles/contact.css'
import { useLang } from '../i18n/LangContext'
import { t, ui } from '../i18n/ui'
import profile from '../data/profile.json'

const FORM_ENDPOINT = 'https://formsubmit.co/ajax/8ede736e9cc3e2abe7fbae0e5a61726e'
const directLinks = profile.contact.filter(c => ['Email', 'LinkedIn'].includes(c.type))

export default function Contact() {
  const { lang } = useLang()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [honey, setHoney] = useState('') // spam trap: bots fill hidden fields
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const handleSubmit = async e => {
    e.preventDefault()
    if (!name || !email || !message) return
    setStatus('sending')
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name,
          email,
          message,
          _subject: `Nuevo mensaje de ${name} · cpacheco-perello.com`,
          _template: 'table',
          _captcha: 'false',
          _honey: honey,
        }),
      })
      if (!res.ok) throw new Error('request failed')
      setStatus('sent')
      setName('')
      setEmail('')
      setMessage('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contacto" className="contact-section">
      <div className="container">
        <h2 className="section-heading">{t(ui.contact.heading, lang)}</h2>
        <p className="section-sub">{t(ui.contact.sub, lang)}</p>
        <p className="contact-direct">
          {t(ui.contact.direct, lang)}
          {directLinks.map(c => (
            <a key={c.type} href={c.href} target={c.type === 'Email' ? undefined : '_blank'} rel="noreferrer">
              <i className={`ti ti-${c.icon}`} aria-hidden="true" /> {c.value}
            </a>
          ))}
        </p>

        {status === 'sent' ? (
          <p className="contact-success">
            <i className="ti ti-circle-check" aria-hidden="true" /> {t(ui.contact.success, lang)}
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="contact-form">
            <input type="text" name="_honey" className="contact-honey" tabIndex={-1} autoComplete="off" aria-hidden="true"
              value={honey} onChange={e => setHoney(e.target.value)} />
            <div className="contact-form-row">
              <div className="contact-field">
                <label htmlFor="c-name">{t(ui.contact.name, lang)}</label>
                <input id="c-name" type="text" placeholder={t(ui.contact.namePlaceholder, lang)} required
                  value={name} onChange={e => setName(e.target.value)} />
              </div>
              <div className="contact-field">
                <label htmlFor="c-email">{t(ui.contact.email, lang)}</label>
                <input id="c-email" type="email" placeholder={t(ui.contact.emailPlaceholder, lang)} required
                  value={email} onChange={e => setEmail(e.target.value)} />
              </div>
            </div>
            <div className="contact-field">
              <label htmlFor="c-message">{t(ui.contact.message, lang)}</label>
              <textarea id="c-message" placeholder={t(ui.contact.messagePlaceholder, lang)} required rows={7}
                value={message} onChange={e => setMessage(e.target.value)} />
            </div>
            {status === 'error' && (
              <p className="contact-error">
                {t(ui.contact.error, lang)}
              </p>
            )}
            <button type="submit" className="btn btn-primary contact-submit" disabled={status === 'sending'}>
              {t(status === 'sending' ? ui.contact.sending : ui.contact.send, lang)}
              <i className="ti ti-send" aria-hidden="true" />
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
