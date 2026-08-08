import React, { useState } from "react";
import { toast } from "react-toastify";
import "./Newsletter.css";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    // Not yet wired to a backend endpoint — connect this to a real
    // newsletter/email service when you have one.
    toast.success("Thanks for subscribing!");
    setEmail("");
  };

  return (
    <section className="pk-newsletter py-5">
      <div className="container text-center">
        <span className="pk-eyebrow text-white-50">Stay Connected</span>
        <h2 className="pk-section-title">Get Ayurvedic Tips &amp; Offers</h2>
        <p className="text-white-50 mb-4">
          Join our list for seasonal wellness tips and early access to new products.
        </p>
        <form className="pk-newsletter-form" onSubmit={onSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-terracotta">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;