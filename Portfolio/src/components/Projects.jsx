import Reveal from './Reveal.jsx';
import { projects } from '../data.js';

export default function Projects() {
  return (
    <section id="projects">
      <div className="wrap">
        <div className="eyebrow">Projects</div>
        <div className="section-head">
          <h2 className="section-title">
            Things I've <span className="accent">built</span>
          </h2>
          <p className="section-sub">
            Four self-directed builds, each one picking up a different piece of the
            stack — from a vanilla-JS weather widget to a component-driven React
            storefront.
          </p>
        </div>
        <div className="project-grid">
          {projects.map((p) => (
            <Reveal as="div" className="project-card" key={p.title}>
              <div className="pf-top">
                <span className="pf-num">{p.index}</span>
                <span className="pf-cat">{p.category}</span>
              </div>
              <h3>{p.title}</h3>
              <ul>
                {p.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
              <div className="tag-row">
                {p.tags.map((t) => (
                  <span className="tag" key={t}>{t}</span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
