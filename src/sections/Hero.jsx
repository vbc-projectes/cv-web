import { useState } from 'react'
import '../styles/hero.css'
import profile from '../data/profile.json'

const initials = profile.name.split(' ').map(w => w[0]).slice(0, 2).join('')
const socials = profile.contact.filter(c => ['GitHub', 'LinkedIn'].includes(c.type))

export default function Hero() {
  const [spinning, setSpinning] = useState(false)

  const handleAvatarClick = () => {
    setSpinning(true)
    setTimeout(() => setSpinning(false), 800)
  }

  return (
    <section className="hero">
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <filter id="contour-lines" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
          <feColorMatrix in="SourceGraphic" type="matrix"
            values="0.33 0.33 0.33 0 0
                    0.33 0.33 0.33 0 0
                    0.33 0.33 0.33 0 0
                    0    0    0   1 0"
            result="gray" />
          <feGaussianBlur in="gray" stdDeviation="2.5" result="blurred" />
          <feConvolveMatrix in="blurred" order="3" edgeMode="duplicate" preserveAlpha="true"
            kernelMatrix="-1 -1 -1 -1 8 -1 -1 -1 -1" result="edges" />
          <feComponentTransfer in="edges" result="boosted">
            <feFuncR type="linear" slope="18" intercept="-0.25" />
            <feFuncG type="linear" slope="18" intercept="-0.25" />
            <feFuncB type="linear" slope="18" intercept="-0.25" />
          </feComponentTransfer>
          <feColorMatrix in="boosted" type="luminanceToAlpha" result="mask" />
          <feFlood style={{ floodColor: 'var(--color-accent)' }} result="tint" />
          <feComposite in="tint" in2="mask" operator="in" />
        </filter>
      </svg>

      <div className="hero-art">
        <img src="/images/hero-bg.jpg" alt="" className="hero-contour-img" loading="eager" />
      </div>

      <div className="container hero-inner">
        <a
          href="/CarlosPachecoPerello-CV.pdf"
          download
          className="hero-avatar-link"
          onClick={handleAvatarClick}
          aria-label="Descargar CV en PDF"
          title="Descargar CV (PDF)"
        >
          <span className={`hero-avatar${spinning ? ' hero-avatar-spin' : ''}`}>{initials}</span>
        </a>
        <div className="hero-content">
          <div className="hero-socials">
            {socials.map(s => (
              <a key={s.type} href={s.href} target="_blank" rel="noreferrer" aria-label={s.type}>
                <i className={`ti ti-${s.icon}`} aria-hidden="true" />
              </a>
            ))}
          </div>
          <h1 className="hero-name">{profile.name}</h1>
          <p className="hero-role">{profile.title.es}</p>
        </div>
      </div>
    </section>
  )
}
