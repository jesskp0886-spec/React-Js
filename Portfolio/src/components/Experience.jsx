import Reveal from './Reveal.jsx';
import { experience } from '../data.js';

export default function Experience() {
  return (
    <section id="experience">
      <div className="wrap">
        <div className="eyebrow">Experience</div>
        <div className="section-head">
          <h2 className="section-title">
            Hands-on, <span className="accent">build by build</span>
          </h2>
        </div>
        <div className="timeline">
          {experience.map((item, i) => (
            <Reveal as="div" className="t-item" key={item.title}>
              <div className="t-index">{String(i + 1).padStart(2, '0')}</div>
              <div>
                <div className="t-date">{item.date}</div>
                <h3>{item.title}</h3>
                <div className="t-org">{item.org}</div>
                <p>{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
