import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import "./ProductItem.css";

const FoodItem = ({ name, description, id, imageUrl, price }) => {
  const { increaseQuantity, decreaseQuantity, quantities } =
    useContext(StoreContext);

  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center">
      <div className="pk-product-card">
        <Link to={`/food/${id}`} className="pk-product-media">
          <img src={imageUrl} alt={name} />
        </Link>
        <div className="pk-product-body">
          <h5 className="pk-product-title">{name}</h5>
          <p className="pk-product-desc">{description}</p>
          <div className="d-flex justify-content-between align-items-center">
            <span className="pk-product-price">LKR {price}</span>
            <div className="pk-product-rating">
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-half"></i>
              <small className="text-muted ms-1">(4.5)</small>
            </div>
          </div>
        </div>
        <div className="pk-product-footer">
          <Link to={`/food/${id}`} className="btn btn-outline-primary btn-sm rounded-pill">
            View Details
          </Link>
          {quantities && quantities[id] > 0 ? (
            <div className="d-flex align-items-center gap-2">
              <button
                className="pk-qty-btn"
                onClick={() => {
                  decreaseQuantity(id);
                }}
              >
                <i className="bi bi-dash"></i>
              </button>
              <span className="fw-semibold">{quantities[id]}</span>
              <button
                className="pk-qty-btn pk-qty-btn-add"
                onClick={() => {
                  increaseQuantity(id);
                }}
              >
                <i className="bi bi-plus"></i>
              </button>
            </div>
          ) : (
            <button
              className="btn btn-gold btn-sm"
              onClick={() => {
                increaseQuantity(id);
              }}
            >
              <i className="bi bi-bag-plus me-1"></i>
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodItem;