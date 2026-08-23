import { useState } from 'react'
import logo from '../assets/Icons/logo-white-1.png'
import Arrow from '../assets/Icons/arrow.png'
import { FaShoppingCart, FaSearch, FaBars, FaTimes } from "react-icons/fa"
import './Header.css'

const navLinks = [
  { label: 'Home', href: '#' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Shop', href: '#shop' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
]

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="header">
      <div className="container header__inner">
        <a href="#" className="header__logo">
          <img src={logo} alt="logo" />
        </a>

        <nav className={`header__nav ${menuOpen ? 'is-open' : ''}`}>
          <ul>
            {navLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} onClick={() => setMenuOpen(false)}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header__actions">
          <button className="header__icon-btn" aria-label="Search">
            <FaSearch />
          </button>

          <span className="header__divider"></span>

          <a href="#cart" className="header__icon-btn header__cart" aria-label="Shopping Cart">
            <FaShoppingCart />
            <span className="header__cart-count">0</span>
          </a>

          <a href="#contact" className="btn-long header__cta">
            Get In Touch
            <img src={Arrow} alt="" className="Arrow-btn" />
          </a>

          <button
            className={`header__toggle ${menuOpen ? 'is-active' : ''}`}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header;