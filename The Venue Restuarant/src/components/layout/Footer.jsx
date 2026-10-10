export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 footer_col">
            <div className="footer_logo">
              <div className="footer_logo_title">The Venue</div>
              <div className="footer_logo_subtitle">restaurant</div>
            </div>
            <div className="copyright">
              {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
              <p style={{ lineHeight: 1.2 }}>
                Copyright &copy;{new Date().getFullYear()} All rights reserved | This template is made with{' '}
                <i className="fa fa-heart-o" aria-hidden="true"></i> by{' '}
                <a href="https://colorlib.com" target="_blank" rel="noreferrer">
                  Colorlib
                </a>
              </p>
            </div>
          </div>

          <div className="col-lg-6 footer_col">
            <div className="footer_about">
              <p>
                Fresh seasonal food, a warm welcome and an evening to remember. Join us for dinner, follow the
                blog for recipes and news, or book a table for your next celebration.
              </p>
            </div>
          </div>

          <div className="col-lg-3 footer_col">
            <div className="footer_contact">
              <ul>
                {[
                  ['Address:', '481 Creekside Lane Avila CA 93424'],
                  ['Phone:', '+53 345 7953 32453'],
                  ['E-mail:', 'yourmail@gmail.com'],
                ].map(([title, text]) => (
                  <li key={title} className="d-flex flex-row align-items-start justify-content-start">
                    <div>
                      <div className="footer_contact_title">{title}</div>
                    </div>
                    <div className="footer_contact_text">{text}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
