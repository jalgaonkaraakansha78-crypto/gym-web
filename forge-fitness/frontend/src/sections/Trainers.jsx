import { InstagramIcon } from '../components/SocialIcons';
import { images } from '../assets/images';
import { getTrainers } from '../services/api';
import { useApiData } from '../hooks/useApiData';
import './Trainers.css';

const FALLBACK_TRAINERS = [
  { image: images.trainers[0], name: 'Rahul Sharma', specialization: 'Strength & Conditioning Coach', experience: '8 Years Experience' },
  { image: images.trainers[1], name: 'Priya Nair', specialization: 'Nutrition & Fat Loss Coach', experience: '6 Years Experience' },
  { image: images.trainers[2], name: 'Vikram Singh', specialization: 'Powerlifting Coach', experience: '10 Years Experience' },
  { image: images.trainers[3], name: 'Anjali Mehta', specialization: 'Functional Training Coach', experience: '5 Years Experience' },
];

export default function Trainers() {
  const { data: trainers } = useApiData(getTrainers, FALLBACK_TRAINERS);

  return (
    <section id="trainers" className="trainers">
      <div className="container">
        <div className="section-head">
          <span className="section-tag">Our Team</span>
          <h2 className="section-heading">Coaches who train with you, not just watch</h2>
        </div>

        <div className="trainers__grid">
          {trainers.map((t) => (
            <div className="trainer-card" key={t._id || t.name}>
              <div className="trainer-card__img">
                <img src={t.image} alt={t.name} loading="lazy" />
                <div className="trainer-card__social"><InstagramIcon size={16} /></div>
              </div>
              <h3>{t.name}</h3>
              <p className="trainer-card__role">{t.specialization}</p>
              <p className="trainer-card__years">{t.experience}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
