import { Award, Dumbbell, ClipboardList, Sparkles } from 'lucide-react';
import './WhyChooseUs.css';

const FEATURES = [
  {
    icon: Award,
    title: 'Expert Trainers',
    text: 'Certified coaches who build a plan around your goals, not a generic routine.',
  },
  {
    icon: Dumbbell,
    title: 'Modern Equipment',
    text: 'A fully-equipped floor of free weights, machines and functional training gear.',
  },
  {
    icon: ClipboardList,
    title: 'Personalized Workouts',
    text: 'Programs that adapt as you progress, so you keep seeing results.',
  },
  {
    icon: Sparkles,
    title: 'Clean & Friendly Environment',
    text: 'A welcoming space that\u2019s sanitized, spacious and never overcrowded.',
  },
];

export default function WhyChooseUs() {
  return (
    <section id="about" className="why">
      <div className="container">
        <div className="section-head">
          <span className="section-tag">Why Forge</span>
          <h2 className="section-heading">Everything you need to train seriously</h2>
        </div>

        <div className="why__grid">
          {FEATURES.map(({ icon: Icon, title, text }) => (
            <div className="why__card" key={title}>
              <div className="why__icon"><Icon size={26} strokeWidth={1.8} /></div>
              <h3 className="why__title">{title}</h3>
              <p className="why__text">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
