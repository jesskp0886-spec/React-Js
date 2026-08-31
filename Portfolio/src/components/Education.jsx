import Reveal from './Reveal.jsx';
import { education } from '../data.js';

export default function Education() {
  return (
    <section id="education">
      <div className="wrap">
        <div className="eyebrow">Education</div>
        <div className="section-head">
          <h2 className="section-title">
            Academic <span className="accent">record</span>
          </h2>
        </div>
        <Reveal className="edu-card">
          <div>
            <h3>{education.degree}</h3>
            <div className="school">{education.school}</div>
            <div className="loc">{education.location}</div>
          </div>
          <div className="edu-badge">{education.badge}</div>
        </Reveal>
      </div>
    </section>
  );
}
