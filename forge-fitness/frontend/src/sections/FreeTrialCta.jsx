import { ArrowRight } from 'lucide-react';
import { images } from '../assets/images';
import './FreeTrialCta.css';

export default function FreeTrialCta() {
  return (
    <section className="trial-cta">
      <div className="trial-cta__media">
        <img src={images.ctaBg} alt="" aria-hidden="true" />
        <div className="trial-cta__scrim" />
      </div>
      <div className="container trial-cta__content">
        <h2 className="trial-cta__heading">Ready to start your fitness journey?</h2>
        <p className="trial-cta__text">Try your first workout with us — completely free.</p>
        <a href="#contact" className="btn btn-primary">
          Book Free Trial <ArrowRight size={18} />
        </a>
      </div>
    </section>
  );
}
