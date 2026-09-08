import { MapPin, Phone, Clock, MessageCircle } from 'lucide-react';
import GetInTouchForm from './GetInTouchForm';
import './Contact.css';

export default function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="section-head">
          <span className="section-tag">Visit Us</span>
          <h2 className="section-heading">Come train with us today</h2>
        </div>

        <div className="contact__grid">
          <div className="contact__info">
            <div className="contact__item">
              <MapPin size={20} />
              <div>
                <h4>Address</h4>
                <p>Forge Fitness, 2nd Floor, Sunrise Complex, Manvel Pada Road, Virar West, Maharashtra 401303</p>
              </div>
            </div>
            <div className="contact__item">
              <Phone size={20} />
              <div>
                <h4>Phone</h4>
                <p>+91 98765 43210</p>
              </div>
            </div>
            <div className="contact__item">
              <Clock size={20} />
              <div>
                <h4>Opening Hours</h4>
                <p>Mon – Sat: 5:00 AM – 11:00 PM<br />Sunday: 6:00 AM – 2:00 PM</p>
              </div>
            </div>

            <div className="contact__actions">
              <a href="tel:+919876543210" className="btn btn-outline">
                <Phone size={17} /> Call Now
              </a>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noreferrer"
                className="btn btn-whatsapp"
              >
                <MessageCircle size={17} /> WhatsApp Us
              </a>
            </div>
          </div>

          <GetInTouchForm />
        </div>

        <div className="contact__map">
          <iframe
            title="Forge Fitness location map"
            src="https://www.google.com/maps?q=Virar+West+Maharashtra&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
