import { useEffect, useRef, useState } from 'react';
import { heroPhrases, profile, stats } from '../data.js';

export default function Hero() {
  const [text, setText] = useState('');
  const reduceMotion = useRef(
    typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ).current;

  useEffect(() => {
    if (reduceMotion) {
      setText(heroPhrases[0]);
      return;
    }
    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timeout;

    const tick = () => {
      const current = heroPhrases[phraseIndex];
      if (!deleting) {
        charIndex++;
        setText(current.slice(0, charIndex));
        if (charIndex === current.length) {
          deleting = true;
          timeout = setTimeout(tick, 1600);
          return;
        }
      } else {
        charIndex--;
        setText(current.slice(0, charIndex));
        if (charIndex === 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % heroPhrases.length;
        }
      }
      timeout = setTimeout(tick, deleting ? 28 : 52);
    };

    timeout = setTimeout(tick, 400);
    return () => clearTimeout(timeout);
  }, [reduceMotion]);

  return (
    <section className="hero" id="hero">
      <div className="wrap">
        <div className="hero-kicker">
          {profile.location} · {profile.status}
        </div>
        <h1>
          {profile.name}
          <span className="role">{profile.role}.</span>
        </h1>
        <p className="hero-lede">
          A final-year B.Com student who rebuilt her own skill set from the ground up
          — trading spreadsheets for the MERN stack, and shipping four working
          applications along the way.
        </p>
        <div className="hero-type">
          {text}
          <span className="cur">▍</span>
        </div>
        <div className="hero-actions">
          <a href="#projects" className="btn btn-solid">View projects</a>
          <a href="#contact" className="btn btn-line">Get in touch</a>
        </div>
      </div>
      <div className="wrap">
        <div className="stat-strip">
          {stats.map((s) => (
            <div className="stat" key={s.label}>
              <div className="num">{s.num}</div>
              <div className="lbl">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
