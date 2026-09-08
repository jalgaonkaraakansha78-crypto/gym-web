import { Phone, MessageCircle, CalendarCheck } from 'lucide-react';
import './MobileActionBar.css';

export default function MobileActionBar() {
  return (
    <div className="mobile-bar" role="navigation" aria-label="Quick contact actions">
      <a href="tel:+919876543210" className="mobile-bar__item">
        <Phone size={19} />
        <span>Call</span>
      </a>
      <a
        href="https://wa.me/919876543210"
        target="_blank"
        rel="noreferrer"
        className="mobile-bar__item"
      >
        <MessageCircle size={19} />
        <span>WhatsApp</span>
      </a>
      <a href="#contact" className="mobile-bar__item mobile-bar__item--primary">
        <CalendarCheck size={19} />
        <span>Book Trial</span>
      </a>
    </div>
  );
}
