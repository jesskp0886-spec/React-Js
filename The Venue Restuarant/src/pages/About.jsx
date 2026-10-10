import usePageStyles from '../hooks/usePageStyles';
import { pageStyles } from '../styles';
import PageHero from '../components/layout/PageHero';
import IntroSection from '../components/common/IntroSection';
import Reservations from '../components/common/Reservations';
import TestimonialSlider from '../components/common/TestimonialSlider';
import { chefs } from '../data/menuData';

const lorem =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec malesuada lorem maximus mauris scelerisque, at rutrum nulla dictum. Ut ac ligula sapien. Suspendisse cursus faucibus finibus. Ut non justo eleifend, facilisis nibh ut, interdum odio.';

export default function About() {
  usePageStyles(pageStyles.about);

  return (
    <>
      <PageHero image="/images/about.jpg" subtitle="The Venue is" title="About us" />
      <IntroSection images={['/images/about_intro.jpg']} imageColClass="col-lg-8" />

      <div className="chefs">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="section_title_container">
                <div className="section_subtitle page_subtitle">Something new</div>
                <div className="section_title">
                  <h1>Meet the Chefs</h1>
                </div>
              </div>
            </div>
          </div>
          <div className="row chefs_text_row">
            {[lorem, `Sit amet, ${lorem.slice(28)}`].map((t, i) => (
              <div className="col-lg-6" key={i}>
                <div className="chefs_text">
                  <p>{t}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="row chefs_row row-eq-height">
            {chefs.map((c) => (
              <div key={c.name} className="col-xl-3 col-md-6 chef_col d-flex flex-column align-items-center justify-content-end">
                <div className="chef">
                  <div className="chef_image">
                    <img src={c.image} alt={c.name} />
                  </div>
                  <div className="chef_content text-center">
                    <div className="chef_name">{c.name}</div>
                    <div className="chef_subtitle">{c.role}</div>
                    <div className="chef_button ml-auto mr-auto trans_400">
                      <a href="#chef" onClick={(e) => e.preventDefault()}>
                        see more
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="testimonials">
        <div
          className="parallax_background parallax-window"
          style={{
            backgroundImage: 'url(/images/testimonials.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
          }}
        ></div>
        <div className="container">
          <div className="row">
            <div className="col text-center">
              <div className="section_title_container">
                <div className="section_subtitle page_subtitle">What they say</div>
                <div className="section_title">
                  <h1>Testimonials</h1>
                </div>
              </div>
            </div>
          </div>
          <div className="row testimonials_row">
            <div className="col-lg-10 offset-lg-1">
              <TestimonialSlider />
            </div>
          </div>
        </div>
      </div>

      <Reservations />
    </>
  );
}
