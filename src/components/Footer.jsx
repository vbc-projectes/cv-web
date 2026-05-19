import '../styles/footer.css'
import profile from '../data/profile.json'

export default function Footer() {
  return (
    <footer className="footer">
      <span className="footer-copy">
        {profile.name} · {profile.location}
      </span>
      <span className="footer-copy">
        {new Date().getFullYear()}
      </span>
    </footer>
  )
}
