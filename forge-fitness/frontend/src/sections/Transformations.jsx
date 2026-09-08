import { images } from '../assets/images';
import './Transformations.css';

const STORIES = [
  {
    img: images.transformations[0],
    name: 'Amit Deshmukh',
    result: 'Lost 14kg in 5 months',
    quote: 'The coaching kept me accountable when motivation alone wasn\u2019t enough.',
  },
  {
    img: images.transformations[1],
    name: 'Sneha Kulkarni',
    result: 'Gained visible strength in 4 months',
    quote: 'I went from struggling with an empty bar to hitting real numbers.',
  },
  {
    img: images.transformations[2],
    name: 'Rohan Iyer',
    result: 'Rebuilt fitness after an injury',
    quote: 'The trainers rebuilt my program around recovery, safely and patiently.',
  },
];

export default function Transformations() {
  return (
    <section className="transformations">
      <div className="container">
        <div className="section-head">
          <span className="section-tag">Real Results</span>
          <h2 className="section-heading">Transformations built here, not promised elsewhere</h2>
        </div>

        <div className="transformations__grid">
          {STORIES.map((s) => (
            <div className="story-card" key={s.name}>
              <div className="story-card__img">
                <img src={s.img} alt={`${s.name} training result`} loading="lazy" />
                <span className="story-card__badge">{s.result}</span>
              </div>
              <p className="story-card__quote">&ldquo;{s.quote}&rdquo;</p>
              <p className="story-card__name">{s.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
