import usePageStyles from '../hooks/usePageStyles';
import { pageStyles } from '../styles';
import PageHero from '../components/layout/PageHero';
import IntroSection from '../components/common/IntroSection';
import VideoSection from '../components/common/VideoSection';
import Reservations from '../components/common/Reservations';
import MenuColumn from '../components/menu/MenuColumn';
import Rating from '../components/common/Rating';
import { menuSections } from '../data/menuData';

export default function Home() {
  usePageStyles(pageStyles.home);

  return (
    <>
      <PageHero
        image="/images/home.jpg"
        subtitle="The Venue is"
        title="An Extraordinery Experience"
        text="Fresh seasonal food, a warm welcome and an evening to remember. Book a table, explore the menu or read the latest from our kitchen on the blog."
        scrollIcon
      />

      <IntroSection images={['/images/intro_1.jpg', '/images/intro_2.jpg']} imageColClass="col-xl-4 col-md-6" />
      <VideoSection />

      <div className="sig">
        <div className="sig_content_container">
          <div className="container">
            <div className="row">
              <div className="col-lg-7">
                <div className="sig_content">
                  <div className="sig_subtitle page_subtitle">Something new</div>
                  <div className="sig_title">
                    <h1>Our Signature Dish</h1>
                  </div>
                  <Rating className="sig_rating" />
                  <div className="sig_name_container d-flex flex-row align-items-start justify-content-start">
                    <div className="sig_name">Pork Tenderloin marinated in Green Pepper</div>
                    <div className="sig_price ml-auto">$20</div>
                  </div>
                  <div className="sig_content_list">
                    <ul className="d-flex flex-row align-items-center justify-content-start">
                      {['Pork', 'Tenderloin', 'Green Pepper', 'Veggies'].map((i) => (
                        <li key={i}>{i}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="button sig_button trans_200">
                    <a href="#order" onClick={(e) => e.preventDefault()}>
                      Order Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="sig_image_container">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 offset-lg-5">
                <div className="sig_image">
                  <div className="background_image" style={{ backgroundImage: 'url(/images/sig.jpg)' }}></div>
                  <img src="/images/sig.jpg" alt="Signature dish" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="themenu">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="themenu_title_bar_container">
                <div className="themenu_stars text-center page_subtitle">5 Stars</div>
                <div className="themenu_rating text-center">
                  <Rating />
                </div>
                <div className="themenu_title_bar d-flex flex-column align-items-center justify-content-center">
                  <div className="themenu_title">The Menu</div>
                </div>
              </div>
            </div>
          </div>
          <div className="row themenu_row">
            {menuSections.map((s) => (
              <MenuColumn key={s.title} title={s.title} dishes={s.dishes} />
            ))}
          </div>
        </div>
      </div>

      <Reservations />
    </>
  );
}
