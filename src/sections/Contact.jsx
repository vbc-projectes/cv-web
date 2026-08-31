import { useState } from 'react'
import '../styles/contact.css'

function encode(data) {
  return Object.keys(data)
    .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
    .join('&')
}

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const handleSubmit = async e => {
    e.preventDefault()
    if (!name || !email || !message) return
    setStatus('sending')
    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'contact', name, email, message }),
      })
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
        <h2 className="section-heading">Contacto</h2>
        <p className="section-sub"> Escríbeme y te respondo lo antes posible.</p>

        {status === 'sent' ? (
          <p className="contact-success">
            <i className="ti ti-circle-check" aria-hidden="true" /> Mensaje enviado. ¡Gracias! Te responderé en breve.
          </p>
        ) : (
          <form
            name="contact"
            method="POST"
            data-netlify="true"
            onSubmit={handleSubmit}
            className="contact-form"
          >
            <input type="hidden" name="form-name" value="contact" />
            <div className="contact-form-row">
              <div className="contact-field">
                <label htmlFor="c-name">Nombre</label>
                <input id="c-name" type="text" placeholder="¿Cómo te llamas?" required
                  value={name} onChange={e => setName(e.target.value)} />
              </div>
              <div className="contact-field">
                <label htmlFor="c-email">Email</label>
                <input id="c-email" type="email" placeholder="¿Cómo puedo contactarte?" required
                  value={email} onChange={e => setEmail(e.target.value)} />
              </div>
            </div>
            <div className="contact-field">
              <label htmlFor="c-message">Mensaje</label>
              <textarea id="c-message" placeholder="Cuéntame en qué puedo ayudarte" required rows={7}
                value={message} onChange={e => setMessage(e.target.value)} />
            </div>
            {status === 'error' && (
              <p className="contact-error">
                No se pudo enviar el mensaje. Prueba de nuevo o escribe directamente a cpacheco.perello@outlook.com.
              </p>
            )}
            <button type="submit" className="contact-submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Enviando…' : 'Enviar'}
              <i className="ti ti-send" aria-hidden="true" />
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
