import { useState } from 'react';
import Reveal from './Reveal.jsx';
import { profile } from '../data.js';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [msg, setMsg] = useState('');

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = form;
    if (!name.trim() || !email.trim() || !message.trim()) {
      setMsg('Please fill in every field.');
      return;
    }
    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setMsg('Opening your email client...');
  };

  return (
    <section id="contact">
      <div className="wrap">
        <div className="eyebrow">Contact</div>
        <div className="section-head">
          <h2 className="section-title">
            Let's <span className="accent">talk</span>
          </h2>
          <p className="section-sub">
            Open to entry-level developer roles, internships, and freelance
            front-end work. I usually reply within a day.
          </p>
        </div>
        <div className="contact-wrap">
          <Reveal className="contact-info">
            <div className="item">
              <div className="ic">✉</div>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </div>
            <div className="item">
              <div className="ic">☎</div>
              <a href={`tel:${profile.phoneHref}`}>{profile.phone}</a>
            </div>
            <div className="item">
              <div className="ic">in</div>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                {profile.linkedinLabel}
              </a>
            </div>
            <div className="item">
              <div className="ic">◈</div>
              <span>{profile.location}</span>
            </div>
          </Reveal>

          <Reveal as="form" className="contact-form" onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
              />
            </div>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
              />
            </div>
            <div className="field">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                required
                placeholder="Tell me about the role or project..."
                value={form.message}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-solid" style={{ alignSelf: 'flex-start' }}>
              Send message
            </button>
            <div id="formMsg">{msg}</div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
