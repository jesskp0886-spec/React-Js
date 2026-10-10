import { useState } from 'react';

const TIMES = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
const today = () => new Date().toISOString().slice(0, 10);

export default function Reservations() {
  const [form, setForm] = useState({ date: today(), time: '11:00', people: '2' });
  const [message, setMessage] = useState(null);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.date || form.date < today()) {
      setMessage({ ok: false, text: 'Please choose today or a future date.' });
      return;
    }
    setMessage({ ok: true, text: `Thank you! We have noted a table for ${form.people} on ${form.date} at ${form.time}.` });
  };

  return (
    <div className="reservations text-center">
      <div
        className="parallax_background parallax-window"
        style={{
          backgroundImage: 'url(/images/reservations.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      ></div>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="reservations_content d-flex flex-column align-items-center justify-content-center">
              <div className="res_stars page_subtitle">5 Stars</div>
              <div className="res_title">Make a Reservation</div>
              <div className="res_form_container">
                <form className="res_form" onSubmit={onSubmit}>
                  <div className="d-flex flex-sm-row flex-column align-items-center justify-content-start">
                    <input type="date" name="date" className="res_input" min={today()} value={form.date} onChange={onChange} required />
                    <select name="time" className="res_input res_select_time" value={form.time} onChange={onChange}>
                      {TIMES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                    <select name="people" className="res_select" value={form.people} onChange={onChange}>
                      {[2, 3, 4, 5, 6].map((n) => (
                        <option key={n} value={n}>
                          {n} person
                        </option>
                      ))}
                    </select>
                  </div>
                  <button className="res_button" type="submit">
                    Make a Reservation
                  </button>
                </form>
                {message && (
                  <div className={`mt-3 ${message.ok ? 'text-success' : 'text-danger'}`} role="status" style={{ color: '#fff' }}>
                    {message.text}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
