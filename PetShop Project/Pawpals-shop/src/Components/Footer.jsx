import './Footer.css'
import logo from '../assets/Icons/main-logo.png'
import bgImg from '../assets/Images/footer-bg-img.jpg'
import { FaFacebookF, FaXTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa6'

const usefulLinks = ['Company', 'About', 'Contact']

const workingHours = [
  { day: 'Mon - Fri', time: '9.00am - 5.00pm' },
  { day: 'Saturday', time: '10.00am - 6.00pm' },
  { day: 'Sunday', time: 'Closed' }
]

function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="container footer__main">
        <div className="footer__brand">
          <div className="footer__logo">
            <img src={logo} className="logo" alt="Pawpals" />
          </div>
          <p>
            Mauris sed molestie sem. Sed vel vestibulum elit, non accumsan risus.
            In vitae sapien viverra est Duo ei ullum inani senserit.
          </p>
          <div className="footer__socials">
            <a href="#" aria-label="Facebook"><FaFacebookF /></a>
            <a href="#" aria-label="Twitter"><FaXTwitter /></a>
            <a href="#" aria-label="LinkedIn"><FaLinkedinIn /></a>
            <a href="#" aria-label="Instagram"><FaInstagram /></a>
          </div>
        </div>
        <div className="footer__dog">
          <img src={bgImg} alt="Dog with food bowl" />
        </div>
        <div className="footer__col">
          <h4>Useful Link</h4>
          <ul>
            {usefulLinks.map((link) => (
              <li key={link}>
                <a href="#">{link}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer__col">
          <h4>Working Time</h4>
          <ul>
            {workingHours.map((wh) => (
              <li key={wh.day}>
                {wh.day}: {wh.time}
              </li>
            ))}
          </ul>
        </div>
        <div className="footer__col">
          <h4>Our address</h4>
          <p>
            Old Westbury 256, New York
            <br />
            11201, United States
          </p>
        </div>
      </div>
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>
            Copyright © 2024 <a href="#">Pawpals</a>, All Rights Reserved.
          </p>
          <div className="footer__bottom-links">
            <a href="#">Terms &amp; Condition</a>
            <a href="#">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;