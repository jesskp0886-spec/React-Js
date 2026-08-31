import Reveal from './Reveal.jsx';
import { skillGroups } from '../data.js';

export default function Skills() {
  return (
    <section id="skills">
      <div className="wrap">
        <div className="eyebrow">Skills</div>
        <div className="section-head">
          <h2 className="section-title">Toolkit</h2>
        </div>
        <div className="skills-list">
          {skillGroups.map((g) => (
            <Reveal as="div" className="skill-row" key={g.label}>
              <div className="s-label">{g.label}</div>
              <div className="s-items">
                {g.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
