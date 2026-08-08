import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import heroVideo from "../../assets/hero-video.mp4";

const Header = () => {
  return (
    <section className="pk-hero">
      <video
        className="pk-hero-video-bg"
        src={heroVideo}
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="pk-hero-overlay"></div>

      <div className="container">
        <div className="row align-items-center gy-5">
          <div className="col-lg-6">
            <span className="pk-eyebrow">
              <i className="bi bi-flower2 me-2"></i>
              100% Natural &amp; Chemical-Free
            </span>
            <h1 className="pk-hero-title">
              Pure Ayurveda,<br /><span className="pk-hero-title-accent">Rooted in Sri Lanka</span>
            </h1>
            <p className="pk-sinhala pk-hero-sinhala">ආයුර්වේද • ස්වභාවික සුවතාව</p>
            <p className="pk-hero-sub">
              Hand picked leaves, flowers, roots and herbal blends sourced
              responsibly from local growers and delivered island wide across Sri Lanka.
            </p>
            <div className="d-flex flex-wrap gap-3 mt-4">
              <Link to="/explore" className="btn btn-outline-dark btn-lg px-4">
                Shop the Collection
              </Link>
              <Link to="/contact" className="btn btn-outline-dark btn-lg rounded-pill px-4">
                Talk to an Expert
              </Link>
            </div>
            <div className="pk-hero-stats d-flex flex-wrap gap-4 mt-5">
              <div>
                <strong>50+</strong>
                <span>Herbal Products</span>
              </div>
              <div>
                <strong>25</strong>
                <span>Districts Delivered</span>
              </div>
              <div>
                <strong>5000+</strong>
                <span>Years of Wisdom</span>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="pk-hero-visual">
              <svg
                className="pk-hero-botanical"
                viewBox="0 0 400 460"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M200 440C200 440 60 380 60 240C60 140 120 60 200 60C280 60 340 140 340 240C340 380 200 440 200 440Z"
                  stroke="#D9A441" strokeOpacity="0.5" strokeWidth="1.5"
                />
                <path d="M200 420V90" stroke="#D9A441" strokeOpacity="0.55" strokeWidth="1.2" />
                <path
                  d="M200 140L140 100M200 210L270 165M200 280L140 245M200 350L270 315"
                  stroke="#D9A441" strokeOpacity="0.55" strokeWidth="1"
                />
              </svg>
              <div className="pk-hero-badge">
                <i className="bi bi-patch-check-fill"></i>
                <div>
                  <strong>Certified</strong>
                  <span>Organic Sourcing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;