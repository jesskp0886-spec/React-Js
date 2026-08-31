import { profile } from '../data.js';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        © {new Date().getFullYear()} {profile.name} — built with React &amp; Vite.
      </div>
    </footer>
  );
}
