import React from "react";
import "./WhyChooseUs.css";

const points = [
  {
    icon: "bi-patch-check",
    title: "Certified Organic",
    text: "Every batch is tested for purity — no fillers, no synthetic pesticides.",
  },
  {
    icon: "bi-book",
    title: "5000 Years of Wisdom",
    text: "Formulated using traditional Ayurvedic knowledge passed down through generations.",
  },
  {
    icon: "bi-geo-alt",
    title: "Grown in Sri Lanka",
    text: "Sourced directly from local growers across the island's herb-rich regions.",
  },
  {
    icon: "bi-truck",
    title: "Island-Wide Delivery",
    text: "Cash on delivery available, with dispatch to all 25 districts.",
  },
];

const WhyChooseUs = () => (
  <section className="pk-why py-5">
    <div className="container">
      <div className="text-center mb-5">
        <span className="pk-eyebrow">Why Prakruti</span>
        <h2 className="pk-section-title">Wellness You Can Trust</h2>
      </div>
      <div className="row g-4">
        {points.map((p) => (
          <div className="col-6 col-lg-3" key={p.title}>
            <div className="pk-why-card">
              <div className="pk-why-icon">
                <i className={`bi ${p.icon}`}></i>
              </div>
              <h5>{p.title}</h5>
              <p>{p.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseUs;