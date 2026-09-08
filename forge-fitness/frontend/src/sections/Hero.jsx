import { ArrowRight, PlayCircle } from 'lucide-react';
import { images } from '../assets/images';
import './Hero.css';

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero__media">
        <img src={images.heroBg} alt="Athlete training with barbell inside Forge Fitness gym" />
        <div className="hero__scrim" />
      </div>

      <div className="hero__content container">
        <p className="hero__kicker">Virar's Premium Strength &amp; Conditioning Gym</p>
        <h1 className="hero__headline">
          Build Strength.<br />Build Confidence.
        </h1>
        <p className="hero__sub">
          Forge Fitness pairs certified coaching with real equipment and a community
          that pushes you further — so every session moves you closer to the
          strongest version of yourself.
        </p>

        <div className="hero__actions">
          <a href="#contact" className="btn btn-primary">
            Start Your Free Trial <ArrowRight size={18} />
          </a>
          <a href="#membership" className="btn btn-outline">
            <PlayCircle size={18} /> View Memberships
          </a>
        </div>

        <div className="hero__trust">
          <span>500+ Active Members</span>
          <i />
          <span>Certified Trainers</span>
          <i />
          <span>Modern Equipment</span>
        </div>
      </div>
    </section>
  );
}
