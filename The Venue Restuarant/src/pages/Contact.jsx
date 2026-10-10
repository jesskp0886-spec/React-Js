import usePageStyles from '../hooks/usePageStyles';
import { pageStyles } from '../styles';
import PageHero from '../components/layout/PageHero';
import Reservations from '../components/common/Reservations';

const SOCIAL = ['pinterest', 'facebook', 'twitter', 'dribbble', 'behance', 'linkedin'];

export default function Contact() {
  usePageStyles(pageStyles.contact);

  return (
    <>
      <PageHero image="/images/contact.jpg" subtitle="The Venue" title="Contact" />

      <div className="contact">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="contact_title">Contact info</div>
              <div className="contact_text">
                <p>
                  Questions about the menu, a private event or a booking? Call us, send an email or drop in. We are
                  happy to help you plan an evening to remember.
                </p>
              </div>
              <div className="contact_logo_container">
                <div className="contact_logo_title">The Venue</div>
                <div className="contact_logo_subtitle">restaurant</div>
              </div>
            </div>
            <div className="col-xl-5 col-lg-6">
              <div className="contact_list_container d-flex flex-column align-items-lg-center justify-content-start">
                <div className="contact_list_content">
                  <ul className="contact_list">
                    {[
                      ['Address', '1481 Creekside Lane Avila Beach, CA 93424'],
                      ['Phone', '+53 345 7953 324'],
                      ['E-mail', 'yourmail@gmail.com'],
                    ].map(([label, value]) => (
                      <li key={label} className="d-flex flex-row align-items-start justify-content-start">
                        <div>
                          <div>{label}</div>
                        </div>
                        <div>{value}</div>
                      </li>
                    ))}
                  </ul>
                  <div className="contact_social">
                    <ul className="d-flex flex-row align-items-center justify-content-start">
                      {SOCIAL.map((s) => (
                        <li key={s}>
                          <a href="#social" onClick={(e) => e.preventDefault()} aria-label={s}>
                            <i className={`fa fa-${s}`} aria-hidden="true"></i>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row google_map_row">
            <div className="col">
              <div className="contact_map">
                <div className="map">
                  <div id="google_map" className="google_map">
                    <div className="map_container">
                      <div id="map">
                        <iframe
                          title="The Venue location"
                          src="https://www.openstreetmap.org/export/embed.html?bbox=-120.78%2C35.16%2C-120.68%2C35.21&layer=mapnik&marker=35.18%2C-120.73"
                          style={{ width: '100%', height: '100%', border: 0 }}
                          loading="lazy"
                        ></iframe>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Reservations />
    </>
  );
}
