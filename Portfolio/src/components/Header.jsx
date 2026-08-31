import { useEffect, useState } from 'react';
import { navLinks } from '../data.js';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('about');

  useEffect(() => {
    const sections = navLinks
      .map((l) => document.getElementById(l.id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -45% 0px' }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="site-header">
      <div className="wrap nav-row">
        <a href="#hero" className="brand" onClick={() => setOpen(false)}>
          <span className="dot" />
          jiya<span style={{ color: 'var(--text-dim)' }}>.dev</span>
        </a>
        <nav className={`primary-nav ${open ? 'open' : ''}`}>
          <ul>
            {navLinks.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  className={active === l.id ? 'active' : ''}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <button
          className="nav-toggle"
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span style={open ? { transform: 'translateY(6.5px) rotate(45deg)' } : {}} />
          <span style={open ? { opacity: 0 } : {}} />
          <span style={open ? { transform: 'translateY(-6.5px) rotate(-45deg)' } : {}} />
        </button>
      </div>
    </header>
  );
}
