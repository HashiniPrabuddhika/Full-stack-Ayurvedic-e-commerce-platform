import React from "react";
import "./Testimonials.css";

// ⚠️ Sample content — replace with real customer reviews before launch.
const reviews = [
  {
    name: "Amaya K.",
    location: "Colombo",
    text: "The Ashwagandha powder has genuinely helped with my sleep. Delivery to Colombo was quick too.",
    rating: 5,
  },
  {
    name: "Nadeesha P.",
    location: "Kandy",
    text: "Love that everything is sourced locally. The tulsi tea is now part of my daily routine.",
    rating: 5,
  },
  {
    name: "Chathura R.",
    location: "Galle",
    text: "Good packaging, honest descriptions, and cash on delivery made it an easy first order.",
    rating: 4,
  },
];

const Testimonials = () => (
  <section className="pk-reviews py-5">
    <div className="container">
      <div className="text-center mb-5">
        <span className="pk-eyebrow">Customer Stories</span>
        <h2 className="pk-section-title">What Sri Lanka is Saying</h2>
      </div>
      <div className="row g-4">
        {reviews.map((r) => (
          <div className="col-md-4" key={r.name}>
            <div className="pk-review-card">
              <div className="pk-review-stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <i key={i} className={`bi ${i < r.rating ? "bi-star-fill" : "bi-star"}`}></i>
                ))}
              </div>
              <p>"{r.text}"</p>
              <strong>{r.name}</strong>
              <span>{r.location}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;