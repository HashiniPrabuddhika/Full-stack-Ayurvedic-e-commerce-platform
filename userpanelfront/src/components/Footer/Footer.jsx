import React from "react";
import { Link } from "react-router-dom";
import { assests } from "../../assets/assests";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="pk-footer mt-5">
      <div className="container py-5">
        <div className="row gy-4">
          <div className="col-12 col-md-4">
            <div className="d-flex align-items-center mb-3">
              <img src={assests.logo} alt="Prakruti Ayurveda" height={40} width={40} className="me-2" />
              <span className="pk-footer-brand">
                Prakruti <span className="pk-brand-accent">Ayurveda</span>
              </span>
            </div>
            <p className="pk-footer-text">
              Ethically sourced leaves, flowers, roots and herbal blends —
              bringing traditional Ayurvedic wellness to doorsteps across Sri Lanka.
            </p>
            <div className="d-flex gap-3 pk-footer-social">
              <a href="#" aria-label="Facebook"><i className="bi bi-facebook"></i></a>
              <a href="#" aria-label="Instagram"><i className="bi bi-instagram"></i></a>
              <a href="#" aria-label="WhatsApp"><i className="bi bi-whatsapp"></i></a>
            </div>
          </div>

          <div className="col-6 col-md-2">
            <h6 className="pk-footer-heading">Shop</h6>
            <ul className="list-unstyled pk-footer-links">
              <li><Link to="/explore">All Products</Link></li>
              <li><Link to="/cart">Cart</Link></li>
              <li><Link to="/myorders">My Orders</Link></li>
            </ul>
          </div>

          <div className="col-6 col-md-2">
            <h6 className="pk-footer-heading">Company</h6>
            <ul className="list-unstyled pk-footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          <div className="col-12 col-md-4">
            <h6 className="pk-footer-heading">Get in Touch</h6>
            <ul className="list-unstyled pk-footer-links">
              <li><i className="bi bi-geo-alt me-2"></i>Galle Road, Ambalangoda, Sri Lanka</li>
              <li><i className="bi bi-telephone me-2"></i>+94 77 123 4567</li>
              <li><i className="bi bi-envelope me-2"></i>hello@prakruti-ayurveda.lk</li>
              <li><i className="bi bi-cash-coin me-2"></i>Cash on Delivery &amp; Online Payments</li>
            </ul>
          </div>
        </div>

        <hr className="pk-footer-divider" />
        <p className="text-center pk-footer-copyright mb-0">
          © {new Date().getFullYear()} Prakruti Ayurveda. Made in Sri Lanka 🇱🇰. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;