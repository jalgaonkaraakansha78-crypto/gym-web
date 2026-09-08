import { Check } from 'lucide-react';
import { getMemberships } from '../services/api';
import { useApiData } from '../hooks/useApiData';
import './Membership.css';

const FALLBACK_PLANS = [
  {
    name: 'Basic',
    price: 1499,
    duration: 'per month',
    features: ['Full Gym Access', 'Cardio Zone', 'Locker Facility'],
    popular: false,
  },
  {
    name: 'Pro',
    price: 2499,
    duration: 'per month',
    features: ['Everything in Basic', 'Personalized Workout Plan', 'Diet Guidance'],
    popular: true,
  },
  {
    name: 'Elite',
    price: 3999,
    duration: 'per month',
    features: ['Everything in Pro', 'Dedicated Personal Trainer', 'Monthly Progress Tracking'],
    popular: false,
  },
];

export default function Membership() {
  const { data: plans } = useApiData(getMemberships, FALLBACK_PLANS);

  return (
    <section id="membership" className="membership">
      <div className="container">
        <div className="section-head center">
          <span className="section-tag">Membership</span>
          <h2 className="section-heading">Simple plans, no hidden charges</h2>
          <p className="section-lede">Pick a plan that matches your goals. Upgrade or cancel anytime.</p>
        </div>

        <div className="membership__grid">
          {plans.map((plan) => (
            <div className={`plan-card ${plan.popular ? 'plan-card--featured' : ''}`} key={plan._id || plan.name}>
              {plan.popular && <span className="plan-card__badge">Most Popular</span>}
              <h3 className="plan-card__name">{plan.name}</h3>
              <div className="plan-card__price">
                ₹{Number(plan.price).toLocaleString('en-IN')}
                <span>{plan.duration}</span>
              </div>
              <ul className="plan-card__features">
                {plan.features.map((f) => (
                  <li key={f}><Check size={16} /> {f}</li>
                ))}
              </ul>
              <a
                href="#contact"
                className={`btn ${plan.popular ? 'btn-primary' : 'btn-ghost'} plan-card__cta`}
              >
                Join Now
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
