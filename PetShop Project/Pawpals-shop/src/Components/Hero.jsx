import { useEffect, useState } from 'react'
import heroSlide1 from '../assets/Images/slider-3-slide-01.jpg'
import heroSlide2 from '../assets/Images/slider-3-slide-02.jpg'
import heroSlide3 from '../assets/Images/slider-3-slide-03.jpg'
import Arrow from '../assets/Icons/arrow.png'
import './Hero.css'

const slides = [
  {
    tag: 'Want to have',
    title: 'Good Products for your Pet',
    image: heroSlide1,
  },
  {
    tag: 'With pets, life is better.',
    title: 'Make your dogs feel wonderful.',
    image: heroSlide2,
  },
  {
    tag: 'Take The Pet Habit',
    title: 'excellent quality pet products.',
    image: heroSlide3,
  },
]

function Hero() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="hero">
      <div className="hero__slide">
        <img
          src={slides[active].image}
          alt={slides[active].title}
          className="slider-image"
        />

        <div className="hero__overlay"></div>

        <div className="hero-container hero__content">
          <span className="hero__tag">
            {slides[active].tag}
          </span>

          <h1 className="hero__title">
            {slides[active].title}
          </h1>

          <div className="hero__buttons">
            <a
              href="#about"
              className="hero__btn hero__btn--primary"
            >
              Know More
              <span><img src={Arrow} alt="" className='Arrow-btn' /></span>
            </a>

            <a
              href="#contact"
              className="hero__btn hero__btn--secondary"
            >
              Contact Us
              <span><img src={Arrow} alt="" className='Arrow-btn' /></span>
            </a>
          </div>
        </div>
      </div>

      <div className="hero__dots">
        {slides.map((slide, i) => (
          <button
            key={i}
            type="button"
            className={`hero__dot ${i === active ? 'is-active' : ''}`}
            onClick={() => setActive(i)}
            aria-label={`Show slide ${i + 1}`}
            aria-current={i === active ? 'true' : undefined}
          />
        ))}
      </div>
    </section>
  )
}

export default Hero;