import { Star } from 'lucide-react';
import { images } from '../assets/images';
import { getTestimonials } from '../services/api';
import { useApiData } from '../hooks/useApiData';
import './Testimonials.css';

const FALLBACK_REVIEWS = [
  {
    name: 'Karan Patil',
    image: images.testimonialAvatars[0],
    rating: 5,
    message: 'The trainers are supportive and the environment is amazing. I\u2019ve completely changed my lifestyle.',
  },
  {
    name: 'Neha Joshi',
    image: images.testimonialAvatars[1],
    rating: 5,
    message: 'Best gym I\u2019ve trained at. Clean equipment, zero waiting time, and coaches who actually care.',
  },
  {
    name: 'Suresh Rao',
    image: images.testimonialAvatars[2],
    rating: 5,
    message: 'Joined for weight loss, stayed for the community. Down 11kg and stronger than ever.',
  },
  {
    name: 'Divya Menon',
    image: images.testimonialAvatars[3],
    rating: 4,
    message: 'The personal training sessions are worth every rupee. My form has improved massively.',
  },
];

export default function Testimonials() {
  const { data: reviews } = useApiData(getTestimonials, FALLBACK_REVIEWS);

  return (
    <section className="testimonials">
      <div className="container">
        <div className="section-head">
          <span className="section-tag">Testimonials</span>
          <h2 className="section-heading">What our members say</h2>
        </div>

        <div className="testimonials__grid">
          {reviews.map((r) => (
            <div className="testimonial-card" key={r._id || r.name}>
              <div className="testimonial-card__stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={15} fill={i < r.rating ? '#ff4d1c' : 'none'} color="#ff4d1c" />
                ))}
              </div>
              <p className="testimonial-card__text">&ldquo;{r.message}&rdquo;</p>
              <div className="testimonial-card__author">
                <img src={r.image} alt={r.name} loading="lazy" />
                <span>{r.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
