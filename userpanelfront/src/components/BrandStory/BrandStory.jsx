import React from "react";
import storyPhoto from "../../assets/storyPhoto.png"
import "./BrandStory.css";

const BrandStory = () => (
  <section className="pk-story py-5">
    <div className="container">
      <div className="row align-items-center g-5">
        <div className="col-lg-6">
          <div className="pk-story-visual">
            
            <img src={storyPhoto} alt="Our herb sourcing in Sri Lanka" /> 
          </div>
        </div>
        <div className="col-lg-6">
          <span className="pk-eyebrow">Our Story</span>
          <h2 className="pk-section-title">
            Ancient Wisdom,<br />Grown Fresh in Sri Lanka
          </h2>
          <p className="pk-sinhala mb-3">ආයුර්වේද — ජීවිතයේ විද්‍යාව</p>
          <p className="pk-story-text">
            Prakruti Ayurveda partners directly with growers across Sri Lanka's
            herb-rich regions to bring you leaves, flowers, roots and blends
            exactly as tradition intended — unprocessed, untampered, and full
            of the island's natural vitality.
          </p>
          <div className="row g-4 mt-2">
            <div className="col-4">
              <strong>500+</strong>
              <span>Happy Customers</span>
            </div>
            <div className="col-4">
              <strong>50+</strong>
              <span>Herbal Products</span>
            </div>
            <div className="col-4">
              <strong>25</strong>
              <span>Districts Served</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default BrandStory;