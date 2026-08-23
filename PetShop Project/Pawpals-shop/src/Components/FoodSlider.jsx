import { useEffect, useRef, useState } from 'react'
import './FoodSlider.css'
import { FaShoppingCart } from "react-icons/fa"

import shop5 from '../assets/Images/shop-05.jpg'
import shop1 from '../assets/Images/shop-01.jpg'
import shop2 from '../assets/Images/shop-02.jpg'
import shop3 from '../assets/Images/shop-03.jpg'
import shop6 from '../assets/Images/shop-06.jpg'
import paw from '../assets/Icons/minimalPaw.png'

const products = [
    {
        name: 'Chicken Treats',
        price: '₹25.00',
        image: shop5,
        rating: 5,
    },
    {
        name: 'Product Packaging',
        price: '₹18.00',
        oldPrice: '₹20.00',
        image: shop1,
        rating: 4,
    },
    {
        name: 'Dog Toys',
        price: '₹25.00',
        oldPrice: '₹30.00',
        image: shop2,
        rating: 5,
    },
    {
        name: 'Means Pets',
        price: '₹11.05',
        image: shop3,
        rating: 5,
    },
    {
        name: 'Coconut Jerky',
        price: '₹15.00',
        image: shop6,
        rating: 5,
    },
]

const sliderProducts = [...products, ...products, ...products]

function FoodSlider() {

    const [currentIndex, setCurrentIndex] = useState(products.length)
    const [isTransitioning, setIsTransitioning] = useState(true)

    const autoSlideRef = useRef(null)

    const cardWidth = 310
    const gap = 28
    const moveAmount = cardWidth + gap

    const nextSlide = () => {
        setIsTransitioning(true)
        setCurrentIndex((prev) => prev + 1)
    }

    const prevSlide = () => {
        setIsTransitioning(true)
        setCurrentIndex((prev) => prev - 1)
    }

    useEffect(() => {

        autoSlideRef.current = setInterval(() => {
            nextSlide()
        }, 3000)

        return () => clearInterval(autoSlideRef.current)

    }, [])

    useEffect(() => {

        if (currentIndex >= products.length * 2) {

            setTimeout(() => {
                setIsTransitioning(false)
                setCurrentIndex(products.length)
            }, 600)

        }

        if (currentIndex < products.length) {

            setTimeout(() => {
                setIsTransitioning(false)
                setCurrentIndex(products.length * 2 - 1)
            }, 600)

        }

    }, [currentIndex])

    const handleMouseEnter = () => {
        clearInterval(autoSlideRef.current)
    }

    const handleMouseLeave = () => {

        clearInterval(autoSlideRef.current)

        autoSlideRef.current = setInterval(() => {
            nextSlide()
        }, 3000)

    }

    return (
        <section className="food-section">

            <div className="food-container">

                <div className="food-header">

                    <div className="food-heading">

                        <span className="food-tag">
                            <span className="food-tag-icon"><img src={paw} alt="" className='paw'/></span>
                            BEST IN STORE
                        </span>

                        <h2>Premium Pet Food</h2>

                    </div>

                    <div className="food-arrows">

                        <button
                            className="food-arrow"
                            onClick={prevSlide}
                        >
                            ‹
                        </button>

                        <button
                            className="food-arrow"
                            onClick={nextSlide}
                        >
                            ›
                        </button>

                    </div>

                </div>

                <div
                    className="food-slider-wrapper"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >

                    <div
                        className="food-slider-track"
                        style={{
                            transform: `translateX(-${currentIndex * moveAmount}px)`,
                            transition: isTransitioning
                                ? 'transform 0.6s ease'
                                : 'none'
                        }}
                    >

                        {sliderProducts.map((product, index) => (

                            <div
                                className="food-card"
                                key={index}
                            >

                                <div className="food-image-wrapper">

                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="food-image"
                                    />

                                </div>

                                <div className="food-card-content">

                                    <h3>{product.name}</h3>

                                    <div className="food-price">

                                        {product.oldPrice && (
                                            <span className="food-old-price">
                                                {product.oldPrice}
                                            </span>
                                        )}

                                        <span className="food-current-price">
                                            {product.price}
                                        </span>

                                    </div>

                                    <div className="food-rating">

                                        {[1, 2, 3, 4, 5].map((star) => (

                                            <span
                                                key={star}
                                                className={
                                                    star <= product.rating
                                                        ? 'active'
                                                        : ''
                                                }
                                            >
                                                ★
                                            </span>

                                        ))}

                                    </div>

                                </div>

                                <button className="food-cart">

                                    <FaShoppingCart
                                        color="#ffffffae"
                                        fontSize="20px"
                                    />

                                </button>

                            </div>

                        ))}

                    </div>

                </div>

            </div>

        </section>
    )
}

export default FoodSlider;