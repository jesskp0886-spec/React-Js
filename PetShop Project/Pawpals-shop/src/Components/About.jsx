import './About.css'
import aboutImage1 from '../assets/Images/staticbx-img-01.jpg'
import aboutImage2 from '../assets/Images/staticbx-img-02.jpg'
import Arrow from '../assets/Icons/arrow.png'

const featureBoxes = [
    {
        tag: 'CLOTHING',
        title: 'Amazing pets clothes',
        desc: 'The medical professional doctors available in the clinic',
        image: aboutImage1,
    },
    {
        tag: 'HEALTHY',
        title: 'Cat and dog foods',
        desc: 'The medical professional doctors available in the clinic',
        image: aboutImage2,
    },
]

const quickServices = [
    'Grooming',
    'Adoption',
    'Medical',
    'Walking',
]

function About() {
    return (
        <section className="about section" id="about">

            <div className="container">

                <div className="about__boxes">
                    {featureBoxes.map((box, index) => (
                        <div className="about__box" key={index}>

                            <div className="about__box-img">
                                <img
                                    src={box.image}
                                    alt={box.title}
                                />
                            </div>

                            <div className="about__box-body">

                                <p className="section-tag">
                                    {box.tag}
                                </p>

                                <h3>
                                    {box.title}
                                </h3>

                                <div className="about__divider"></div>

                                <p>
                                    {box.desc}
                                </p>

                                <a
                                    href="#about"
                                    className="about__link"
                                >
                                    <img src={Arrow} alt="" className='Arrow-btn' />
                                </a>

                            </div>

                        </div>
                    ))}
                </div>

            </div>

            <div className="about__services">
                <div className="about__services-track">

                    {quickServices.map((service, index) => (
                        <div
                            className="about__service"
                            key={index}
                        >
                            <span>{service}</span>
                            <strong>+</strong>
                        </div>
                    ))}

                    {quickServices.map((service, index) => (
                        <div
                            className="about__service"
                            key={`duplicate-${index}`}
                        >
                            <span>{service}</span>
                            <strong>+</strong>
                        </div>
                    ))}

                </div>
            </div>

        </section>
    )
}

export default About