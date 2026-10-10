import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

const LINKS = [
  { to: '/', label: 'home', end: true },
  { to: '/about', label: 'about us' },
  { to: '/menu', label: 'menu' },
  { to: '/blog', label: 'blog' },
  { to: '/contact', label: 'contact' },
  { to: '/admin', label: 'admin' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 91);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // close the full-screen menu after navigating
  useEffect(() => setOpen(false), [pathname]);

  const navItems = (
    <ul className="d-flex flex-row align-items-center justify-content-start">
      {LINKS.map((l) => (
        <li key={l.to}>
          <NavLink to={l.to} end={l.end}>
            {l.label}
          </NavLink>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="header_content d-flex flex-row align-items-center justify-content-start">
                <div className="logo">
                  <Link to="/">
                    <div>The Venue</div>
                    <div>restaurant</div>
                  </Link>
                </div>
                <nav className="main_nav">{navItems}</nav>
                <div className="reservations_phone ml-auto">Reservations: +34 586 778 8892</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div
        className={`hamburger_bar trans_400 d-flex flex-row align-items-center justify-content-start ${
          scrolled ? 'scrolled' : ''
        }`}
      >
        <div className={`hamburger ${open ? 'active' : ''}`} onClick={() => setOpen((o) => !o)}>
          <div className="menu_toggle d-flex flex-row align-items-center justify-content-start">
            <span>menu</span>
            <div className="hamburger_container">
              <div className="menu_hamburger">
                <div className="line_1 hamburger_lines"></div>
                <div className="line_2 hamburger_lines"></div>
                <div className="line_3 hamburger_lines"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`menu trans_800 ${open ? 'active' : ''}`}>
        <div className="menu_content d-flex flex-column align-items-center justify-content-center text-center">
          <ul>
            {LINKS.map((l) => (
              <li key={l.to}>
                <Link to={l.to}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="menu_reservations_phone ml-auto">Reservations: +34 586 778 8892</div>
      </div>
    </>
  );
}
