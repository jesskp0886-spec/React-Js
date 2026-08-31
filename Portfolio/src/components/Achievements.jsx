import Reveal from './Reveal.jsx';
import { achievements } from '../data.js';

export default function Achievements() {
  return (
    <section id="achievements">
      <div className="wrap">
        <div className="eyebrow">Achievements</div>
        <div className="section-head">
          <h2 className="section-title">Milestones</h2>
        </div>
        <div className="ach-grid">
          {achievements.map((a, i) => (
            <Reveal as="div" className="ach-card" key={a.title}>
              <div className="ach-mark">{String(i + 1).padStart(2, '0')}</div>
              <h4>{a.title}</h4>
              <p>{a.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
