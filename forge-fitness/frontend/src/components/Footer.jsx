import { Dumbbell } from 'lucide-react';
import { InstagramIcon, FacebookIcon, YoutubeIcon } from './SocialIcons';
import './Footer.css';

const QUICK_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Programs', href: '#programs' },
  { label: 'Trainers', href: '#trainers' },
  { label: 'Membership', href: '#membership' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <a href="#home" className="footer__logo">
            <Dumbbell size={22} strokeWidth={2.4} />
            <span>FORGE<em>FITNESS</em></span>
          </a>
          <p>Premium strength &amp; conditioning training in the heart of Virar.</p>
          <div className="footer__socials">
            <a href="#" aria-label="Instagram"><InstagramIcon size={18} /></a>
            <a href="#" aria-label="Facebook"><FacebookIcon size={18} /></a>
            <a href="#" aria-label="YouTube"><YoutubeIcon size={18} /></a>
          </div>
        </div>

        <div className="footer__col">
          <h4>Quick Links</h4>
          <ul>
            {QUICK_LINKS.map((l) => (
              <li key={l.href}><a href={l.href}>{l.label}</a></li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h4>Contact</h4>
          <ul>
            <li>Manvel Pada Road, Virar West</li>
            <li>+91 98765 43210</li>
            <li>hello@forgefitness.in</li>
          </ul>
        </div>

        <div className="footer__col">
          <h4>Opening Hours</h4>
          <ul>
            <li>Mon – Sat: 5:00 AM – 11:00 PM</li>
            <li>Sunday: 6:00 AM – 2:00 PM</li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <p>© {new Date().getFullYear()} Forge Fitness. All rights reserved.</p>
      </div>
    </footer>
  );
}
