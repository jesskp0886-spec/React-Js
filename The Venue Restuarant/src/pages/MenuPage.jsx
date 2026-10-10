import usePageStyles from '../hooks/usePageStyles';
import { pageStyles } from '../styles';
import PageHero from '../components/layout/PageHero';
import Reservations from '../components/common/Reservations';
import MenuColumn from '../components/menu/MenuColumn';
import SignatureDish from '../components/menu/SignatureDish';
import { menuSections, signatureDishes } from '../data/menuData';

const lorem =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec malesuada lorem maximus mauris scelerisque, at rutrum nulla dictum. Ut ac ligula sapien. Suspendisse cursus faucibus finibus. Ut non justo eleifend, facilisis nibh ut, interdum odio.';

export default function MenuPage() {
  usePageStyles(pageStyles.menu);

  return (
    <>
      <PageHero image="/images/menu.jpg" subtitle="The Venue" title="The Menu" />

      <div className="themenu">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="section_title_container text-center">
                <div className="section_subtitle page_subtitle">Something new</div>
                <div className="section_title">
                  <h1>Discover Our Menu</h1>
                </div>
              </div>
            </div>
          </div>
          <div className="row themenu_text_row">
            {[lorem, `Sit amet, ${lorem.slice(28)}`].map((t, i) => (
              <div className="col-lg-6" key={i}>
                <div className="themenu_text">
                  <p>{t}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="row themenu_row">
            {menuSections.map((s) => (
              <MenuColumn key={s.title} {...s} />
            ))}
          </div>
        </div>
      </div>

      <div className="sig">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="section_title_container">
                <div className="section_subtitle page_subtitle">Something new</div>
                <div className="section_title">
                  <h1>Our Signature Dishes</h1>
                </div>
              </div>
            </div>
          </div>
          <div className="row sig_row">
            <div className="col">
              {signatureDishes.map((d) => (
                <SignatureDish key={d.name} {...d} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <Reservations />
    </>
  );
}
