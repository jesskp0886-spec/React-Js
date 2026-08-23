import './Services.css'
import dogImage from '../assets/Images/about-img-02.jpg'
import paw from '../assets/Icons/minimalPaw.png'
import icon1 from '../assets/Icons/member-discount-icon.png'
import icon2 from '../assets/Icons/money-return-icon.png'
import icon3 from '../assets/Icons/free-shipping-icon.png'
import icon4 from '../assets/Icons/online-support-icon.png'

const progressStats = [
  { label: 'Veterinary Care', value: 80 },
  { label: 'Pets Training', value: 95 },
  { label: 'Pets Care', value: 70 },
]

const perks = [
  {
    icon: icon1,
    title: 'Member Discount',
    desc: 'Back guarantee under 7 days',
  },
  {
    icon: icon2,
    title: 'Money Return',
    desc: 'Support online 24 hours a day',
  },
  {
    icon: icon3,
    title: 'Free Shipping',
    desc: 'Free shipping on all order',
  },
  {
    icon: icon4,
    title: 'Online Support',
    desc: 'Online Support 24/7',
  },
]

function Services() {
  return (
    <section className="services" id="services">
      <div className="services__main">
        <div className="container">
          <div className="services__grid">
            <div className="services__image">
              <img src={dogImage} alt="Happy dog" />
              <div className="services__stat">
                <h2>1256+</h2>
                <p>
                  The number of pets successfully treated in our vet clinic
                </p>
              </div>
            </div>

            <div className="services__content">
              <span className="section-tag">
                <span>
                  <img src={paw} alt="" className="paw" />
                </span>
                HOW IT WORKS
              </span>

              <h2 className="section-title">
                Keeping Pets Healthy
                <br />
                Since 1983
              </h2>

              <p className="services__description">
                Duis autem vel eum iriure dolor in hendrerit in vulputate
                velit esse molestie con sequat, vel illum dolore eu feugiat
                nulla facilisis at vero eros et accumsan et iusto odio
                dignissim qui blandit praesent.
              </p>

              <div className="services__bars">
                {progressStats.map((stat) => (
                  <div className="services__bar" key={stat.label}>
                    <div className="services__bar-label">
                      <span>{stat.label}</span>
                      <span>{stat.value}%</span>
                    </div>

                    <div className="services__bar-track">
                      <div
                        className="services__bar-fill"
                        style={{ width: `${stat.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="services__perks-section">
        <div className="container">
          <div className="services__perks">
            {perks.map((perk) => (
              <div className="services__perk" key={perk.title}>
                <img
                  src={perk.icon}
                  alt={perk.title}
                  className="services__perk-icon"
                />
                <div>
                  <h4>{perk.title}</h4>
                  <p>{perk.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services;