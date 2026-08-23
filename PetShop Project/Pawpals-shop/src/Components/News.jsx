import { useEffect, useState } from 'react'
import './News.css'
import news1 from '../assets/Images/blog-img-01.jpg'
import news2 from '../assets/Images/blog-img-02.jpg'
import news3 from '../assets/Images/blog-img-03.jpg'
import Arrow from '../assets/Icons/arrow.png'
import paw from '../assets/Icons/minimalPaw.png'
import { FaRegCalendarAlt, FaUser, FaPhoneAlt, FaRegEnvelope } from "react-icons/fa"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"

const newsData = [
    {
        id: 1,
        category: 'PET NEWS',
        date: 'MAY 06. 2024',
        title: 'A recipe for dog biscuits suitable for the holidays',
        image: news1
    },
    {
        id: 2,
        category: 'CHICKEN FOOD',
        date: 'MAY 04. 2024',
        title: 'Thinking creatively: pet fears and stereotypes',
        image: news2
    },
    {
        id: 3,
        category: 'CAT BOARDING',
        date: 'MAY 06. 2024',
        title: 'Possessing a dog has mental health benefits',
        image: news3
    }
]

const sliderData = [
    newsData[newsData.length - 1],
    ...newsData,
    newsData[0]
]

function News() {
    const [current, setCurrent] = useState(1)
    const [transition, setTransition] = useState(true)

    const nextSlide = () => {
        setTransition(true)
        setCurrent((prev) => prev + 1)
    }

    const prevSlide = () => {
        setTransition(true)
        setCurrent((prev) => prev - 1)
    }

    useEffect(() => {
        if (current === sliderData.length - 1) {
            const timer = setTimeout(() => {
                setTransition(false)
                setCurrent(1)
            }, 600)

            return () => clearTimeout(timer)
        }

        if (current === 0) {
            const timer = setTimeout(() => {
                setTransition(false)
                setCurrent(newsData.length)
            }, 600)

            return () => clearTimeout(timer)
        }
    }, [current])

    return (
        <>
            <section className="news">
                <div className="news__container">
                    <div className="news__header">
                        <div>
                            <span className="news__tag">
                                <img src={paw} alt="" className="paw" />
                                INSIGHTS
                            </span>
                            <h2 className="news__title">News & Feeds.</h2>
                        </div>

                        <div className="news__controls">
                            <button onClick={prevSlide} aria-label="Previous">
                                <FiChevronLeft />
                            </button>

                            <button onClick={nextSlide} aria-label="Next">
                                <FiChevronRight />
                            </button>
                        </div>
                    </div>

                    <div className="news__slider-wrapper">
                        <div
                            className="news__slider"
                            style={{
                                transform: `translateX(calc(-${current} * (33.333333% + 10.666px)))`,
                                transition: transition ? 'transform 0.6s ease-in-out' : 'none'
                            }}
                        >
                            {sliderData.map((item, index) => (
                                <article className="news__card" key={`${item.id}-${index}`}>
                                    <div className="news__image-wrapper">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="news__image"
                                        />

                                        <span className="news__category">
                                            {item.category}
                                        </span>

                                        <a href="#news" className="news__arrow">
                                            <img
                                                src={Arrow}
                                                alt=""
                                                className="Arrow-btn"
                                            />
                                        </a>
                                    </div>

                                    <div className="news__meta">
                                        <span>
                                            <FaRegCalendarAlt /> {item.date}
                                        </span>

                                        <span>
                                            <FaUser /> BY ADMIN
                                        </span>
                                    </div>

                                    <h3 className="news__card-title">
                                        {item.title}
                                    </h3>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <div className="news__topbar">
                <div className="news__topbar-container">
                    <div className="news__top-menu">
                        <a href="#hygiene">HYGIENE</a>
                        <span className="news__dot">•</span>
                        <a href="#training">TRAINING</a>
                        <span className="news__dot">•</span>
                        <a href="#foods">FOODS</a>
                        <span className="news__dot">•</span>
                        <a href="#product">PRODUCT</a>
                    </div>

                    <div className="news__top-contact">
                        <div className="news__contact-item">
                            <span className="news__contact-icon">
                                <FaPhoneAlt />
                            </span>
                            <span>+1 (212) 255-511</span>
                        </div>

                        <div className="news__contact-item">
                            <span className="news__contact-icon">
                                <FaRegEnvelope />
                            </span>
                            <span>noreply@pbmit.com</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default News;