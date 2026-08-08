import React from "react";
import { StoreContext } from "../../context/StoreContext";
import { Link, useNavigate } from "react-router-dom";
import "./Cart.css";
import { useContext } from "react";
import { calculateCartTotals } from "../../util/cartUtils";

const Cart = () => {
  const navigate = useNavigate();
  const { foodList, increaseQuantity, decreaseQuantity, quantities, removeFromCart } =
    useContext(StoreContext);

  const cartItems = foodList.filter((food) => quantities[food.id] > 0);

  const { subtotal, shipping, tax, total } = calculateCartTotals(cartItems, quantities);

  return (
    <div className="container py-5">
      <span className="pk-eyebrow">Checkout</span>
      <h1 className="pk-section-title mb-5">Your Shopping Cart</h1>
      <div className="row">
        <div className="col-lg-8">
          {cartItems.length === 0 ? (
            <div className="text-center py-5 pk-empty-cart">
              <i className="bi bi-basket display-4 text-muted"></i>
              <p className="mt-3 text-muted">Your cart is empty</p>
              <Link to="/explore" className="btn btn-gold mt-2">Browse Products</Link>
            </div>
          ) : (
            <div className="card mb-4 pk-cart-card">
              <div className="card-body">
                {cartItems.map((food) => (
                  <div key={food.id} className="row cart-item align-items-center">
                    <div className="col-md-3">
                      <img
                        src={food.imageUrl}
                        alt={food.name}
                        className="img-fluid rounded pk-cart-thumb"
                        width={100}
                      />
                    </div>
                    <div className="col-md-5">
                      <h5 className="card-title mb-1">{food.name}</h5>
                      <span className="pk-category-pill">{food.category}</span>
                    </div>
                    <div className="col-md-2">
                      <div className="input-group">
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          type="button"
                          onClick={() => decreaseQuantity(food.id)}
                        >
                          -
                        </button>
                        <input
                          style={{ maxWidth: "100px" }}
                          type="text"
                          className="form-control form-control-sm text-center quantity-input"
                          value={quantities[food.id]}
                          readOnly
                        />
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          type="button"
                          onClick={() => increaseQuantity(food.id)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="col-md-2 text-end">
                      <p className="fw-bold pk-cart-line-price mb-1">
                        LKR {(food.price * quantities[food.id]).toFixed(2)}
                      </p>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => {
                          removeFromCart(food.id);
                        }}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                    <hr className="mt-3" />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="text-start mb-4">
            <Link to={"/"} className="btn btn-outline-primary">
              <i className="bi bi-arrow-left me-2"></i>Continue Shopping
            </Link>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card pk-cart-summary">
            <div className="card-body">
              <h5 className="card-title mb-4">Order Summary</h5>
              <div className="d-flex justify-content-between mb-3">
                <span>Subtotal</span>
                <span>LKR {subtotal.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Delivery (within Sri Lanka)</span>
                <span>LKR {shipping.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Tax (10%)</span>
                <span>LKR {tax.toFixed(2)}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-4">
                <strong>Total</strong>
                <strong className="pk-cart-total">LKR {total.toFixed(2)}</strong>
              </div>
              <button
                className="btn btn-gold w-100"
                disabled={cartItems.length === 0}
                onClick={() => navigate("/order")}
              >
                Proceed to Checkout
              </button>
              <p className="text-center small text-muted mt-3 mb-0">
                <i className="bi bi-cash-coin me-1"></i>
                Cash on Delivery available island-wide
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;