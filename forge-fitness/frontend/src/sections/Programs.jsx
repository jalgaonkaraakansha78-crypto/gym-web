import { ArrowUpRight } from 'lucide-react';
import { images } from '../assets/images';
import { getPrograms } from '../services/api';
import { useApiData } from '../hooks/useApiData';
import './Programs.css';

// Static fallback — shown instantly and kept if the backend isn't reachable.
const FALLBACK_PROGRAMS = [
  {
    image: images.programs.weight,
    name: 'Weight Training',
    description: 'Build raw strength with structured free-weight and barbell programming.',
  },
  {
    image: images.programs.muscle,
    name: 'Muscle Building',
    description: 'Hypertrophy-focused splits designed to add size where it counts.',
  },
  {
    image: images.programs.fatloss,
    name: 'Fat Loss',
    description: 'High-output circuits paired with nutrition guidance that gets results.',
  },
  {
    image: images.programs.personal,
    name: 'Personal Training',
    description: 'One-on-one coaching with a trainer fully focused on your goals.',
  },
  {
    image: images.programs.functional,
    name: 'Functional Training',
    description: 'Build strength that carries over to real life and everyday movement.',
  },
  {
    image: images.programs.cardio,
    name: 'Cardio',
    description: 'Improve endurance and heart health with guided cardio sessions.',
  },
];

export default function Programs() {
  const { data: programs } = useApiData(getPrograms, FALLBACK_PROGRAMS);

  return (
    <section id="programs" className="programs">
      <div className="container">
        <div className="section-head">
          <span className="section-tag">Programs</span>
          <h2 className="section-heading">Train for the goal that matters to you</h2>
        </div>

        <div className="programs__grid">
          {programs.map((p) => (
            <a href="#membership" className="program-card" key={p._id || p.name}>
              <div className="program-card__img">
                <img src={p.image} alt={p.name} loading="lazy" />
              </div>
              <div className="program-card__body">
                <h3>{p.name}</h3>
                <p>{p.description}</p>
                <span className="program-card__link">
                  Learn More <ArrowUpRight size={16} />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
