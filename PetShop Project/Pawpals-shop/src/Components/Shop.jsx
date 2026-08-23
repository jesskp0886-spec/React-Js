import { useState } from 'react'
import './Shop.css'
import shop1 from '../assets/Images/shop-01.jpg'
import shop2 from '../assets/Images/shop-03.jpg'
import shop3 from '../assets/Images/shop-04.jpg'
import shop4 from '../assets/Images/shop-07.jpg'
import shop5 from '../assets/Images/shop-08.jpg'
import shop6 from '../assets/Images/shop-09.jpg'
import shop7 from '../assets/Images/shop-10.jpg'
import shop8 from '../assets/Images/shop-11.jpg'
import pawbg from '../assets/Icons/paw-bg-pattern.png'
import bone from '../assets/Icons/bone-img.jpg'
import paw from '../assets/Icons/paw-img.jpg'
import Arrow from '../assets/Icons/arrow.png'

const products = [
  { id: 1, name: 'Product Packaging', price: 18, oldPrice: 20, rating: 4, slot: shop1 },
  { id: 2, name: 'Means Pets', price: 11.05, rating: 5, slot: shop2 },
  { id: 3, name: 'Kitten Play', price: 18, rating: 5, slot: shop3 },
  { id: 4, name: 'Portrait of Dog', price: 42, oldPrice: 45, rating: 5, slot: shop4 },
  { id: 5, name: 'Skloot Crunchies', price: 55, oldPrice: 65, rating: 5, slot: shop5 },
  { id: 6, name: 'Dog Food', price: 16, oldPrice: 18, rating: 5, slot: shop6 },
  { id: 7, name: 'Food Means', price: 35, oldPrice: 45, rating: 0, slot: shop7 },
  { id: 8, name: 'Chicken Food', price: 45, rating: 5, slot: shop8 },
]

const categories = ['Pets Accessories', 'Pet Utilities', 'Organic Pet Food']

function Stars({ rating }) {
  return (
    <span className="shop__stars">
      {'★'.repeat(rating)}
      {'☆'.repeat(5 - rating)}
    </span>
  )
}

function Shop() {
  const [activeTab, setActiveTab] = useState(categories[0])

  return (
    <section className="shop section" id="shop">
      <div className="container">
        <div className="shop__arrivals">
          <div className="section-header">
            <span className="section-tag">🐾 NEW ARRIVALS</span>
            <h2 className="section-title">Products Delivered to Home</h2>
          </div>
          <div className="shop__tabs">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`shop__tab ${activeTab === cat ? 'is-active' : ''}`}
                onClick={() => setActiveTab(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="shop__grid">
            {products.map((product) => (
              <div className="shop__card" key={`${activeTab}-${product.id}`}>
                <img
                  src={product.slot}
                  alt={product.name}
                  className="shop__card-img"
                />
                <div className="shop__card-body">
                  <Stars rating={product.rating} />
                  <h4>{product.name}</h4>
                  <div className="shop__price">
                    {product.oldPrice && (
                      <span className="shop__price-old">
                        ₹{product.oldPrice.toFixed(2)}
                      </span>
                    )}
                    <span className="shop__price-current">
                      ₹{product.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="shop__deal">
          <div className="shop__deal-image"></div>
          <img src={pawbg} className="paw-bg" alt="" />
          <img src={bone} className="bone-icon" alt="" />
          <img src={paw} className="paw-icon" alt="" />

          <div className="shop__deal-content">
            <span>Special Hot Deals</span>
            <h2>OFFER ON PET<br />FOOD PRODUCTS</h2>
            <a href="#shop" className="btn-long primary-btn">Shop Now <span><img src={Arrow} alt="" className='Arrow-btn' /></span></a>
          </div>

          <div className="shop__deal-badge">
            <span>Get 10%</span>
            <small>OFF</small>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Shop;