import '../styles/footer.css'
import profile from '../data/profile.json'

const socials = profile.contact.filter(c => ['GitHub', 'LinkedIn'].includes(c.type))

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-socials">
        {socials.map(s => (
          <a key={s.type} href={s.href} target="_blank" rel="noreferrer" aria-label={s.type}>
            <i className={`ti ti-${s.icon}`} aria-hidden="true" />
          </a>
        ))}
      </div>
      <p>{profile.name} · {profile.location} · {new Date().getFullYear()}</p>
    </footer>
  )
}
