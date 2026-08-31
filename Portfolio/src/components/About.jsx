import Reveal from './Reveal.jsx';
import { ledgerEntries } from '../data.js';

export default function About() {
  return (
    <section id="about">
      <div className="wrap">
        <div className="eyebrow">About</div>
        <div className="section-head">
          <h2 className="section-title">
            Who I am, <span className="accent">unfiltered</span>
          </h2>
        </div>
        <div className="about-grid">
          <Reveal className="about-text">
            <p>
              I'm a <strong>final-year B.Com student</strong> in Surat who spends far
              more time in a code editor than a spreadsheet. Over the past year I
              taught myself the <strong>MERN stack</strong> — MongoDB, Express.js,
              React.js, and Node.js — and backed it up with a formal{' '}
              <strong>Full Stack Web Development certification</strong>.
            </p>
            <p>
              Rather than stop at tutorials, I built four independent projects
              spanning e-commerce, task management, and utility tools, focusing on
              clean, responsive interfaces and dependable backend logic.
            </p>
            <p>
              I'm now looking for an{' '}
              <strong>entry-level Software Development or Web Development role</strong>{' '}
              where I can keep learning fast inside a real engineering team.
            </p>
          </Reveal>

          <Reveal className="ledger">
            <div className="ledger-bar">
              <span className="lb-dot" />
              <span className="lb-dot" />
              <span className="lb-dot" />
              <span className="lb-name">ledger.ts</span>
            </div>
            <div className="ledger-body">
              <div><span className="brace">const</span> jiya = {'{'}</div>
              {ledgerEntries.map((e) => (
                <div className="ledger-row" key={e.key}>
                  <span className="k">{e.key}</span>
                  <span className="brace">: </span>
                  <span className={`v ${/^\d/.test(e.value) ? 'num' : ''}`}>
                    {e.value}
                  </span>
                  <span className="brace">,</span>
                </div>
              ))}
              <div><span className="brace">{'}'}</span>;</div>
              <span className="ledger-comment">// migrated from double-entry books to Git commits</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
