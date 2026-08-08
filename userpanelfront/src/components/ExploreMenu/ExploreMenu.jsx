import React, { useRef } from "react";
import { catagories } from "../../assets/assests";
import "./ExploreMenu.css";

const ExploreMenu = ({ category, setCategory }) => {
  const menuRef = useRef(null);

  const scrollLeft = () => {
    if (menuRef.current) {
      menuRef.current.scrollBy({ left: -220, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (menuRef.current) {
      menuRef.current.scrollBy({ left: 220, behavior: "smooth" });
    }
  };

  return (
    <div className="explore-menu position-relative mb-5">
      <div className="d-flex align-items-end justify-content-between flex-wrap">
        <div>
          <span className="pk-eyebrow">Shop by Category</span>
          <h2 className="pk-section-title mb-1">Explore Our Collection</h2>
          <p className="pk-section-sub mb-0">
            Curated leaves, flowers, roots and herbal essentials — sourced fresh from nature.
          </p>
        </div>
        <div className="d-flex gap-2 mb-3">
          <button className="scroll-btn" onClick={scrollLeft} aria-label="Scroll left">
            <i className="bi bi-arrow-left"></i>
          </button>
          <button className="scroll-btn" onClick={scrollRight} aria-label="Scroll right">
            <i className="bi bi-arrow-right"></i>
          </button>
        </div>
      </div>

      <div className="d-flex gap-4 overflow-auto explore-menu-list pb-2" ref={menuRef}>
        {catagories.map((item, index) => {
          const isActive = item.category === category;
          return (
            <div
              key={index}
              className={`explore-menu-list-item ${isActive ? "active" : ""}`}
              onClick={() =>
                setCategory((prev) => (prev === item.category ? "All" : item.category))
              }
            >
              <span className="explore-menu-index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="explore-menu-icon-ring">
                <span className="explore-menu-icon">{item.icon}</span>
              </span>
              <p className="explore-menu-name mb-0">{item.category}</p>
              <span className="explore-menu-divider"></span>
              <small className="explore-menu-blurb">{item.blurb}</small>
              <span className="explore-menu-cta">
                {isActive ? "Selected" : "Explore"}
                <i className="bi bi-arrow-right"></i>
              </span>
              <span className="explore-menu-arrow">
                <i className="bi bi-arrow-up-right"></i>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExploreMenu;