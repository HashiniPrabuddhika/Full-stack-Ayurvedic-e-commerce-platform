import React from "react";
import "./TrustBadges.css";

const badges = [
  { icon: "bi-flower2", label: "100% Natural" },
  { icon: "bi-geo-alt", label: "Grown in Sri Lanka" },
  { icon: "bi-patch-check", label: "Lab Tested Purity" },
  { icon: "bi-recycle", label: "Sustainably Sourced" },
];

const TrustBadges = () => (
  <div className="pk-trust-row">
    {badges.map((b) => (
      <div className="pk-trust-item" key={b.label}>
        <i className={`bi ${b.icon}`}></i>
        <span>{b.label}</span>
      </div>
    ))}
  </div>
);

export default TrustBadges;