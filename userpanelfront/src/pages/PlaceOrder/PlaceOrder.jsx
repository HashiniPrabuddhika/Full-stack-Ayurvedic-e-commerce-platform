import React, { useContext, useState } from "react";
import { assests } from "../../assets/assests";
import { StoreContext } from "../../context/StoreContext";
import { calculateCartTotals } from "../../util/cartUtils";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./PlaceOrder.css";

// All 25 administrative districts of Sri Lanka
const SRI_LANKA_DISTRICTS = [
  "Ampara", "Anuradhapura", "Badulla", "Batticaloa", "Colombo",
  "Galle", "Gampaha", "Hambantota", "Jaffna", "Kalutara",
  "Kandy", "Kegalle", "Kilinochchi", "Kurunegala", "Mannar",
  "Matale", "Matara", "Monaragala", "Mullaitivu", "Nuwara Eliya",
  "Polonnaruwa", "Puttalam", "Ratnapura", "Trincomalee", "Vavuniya",
];

const PlaceOrder = () => {
  const { foodList, quantities, setQuantities, token } =
    useContext(StoreContext);
  const cartItems = foodList.filter((food) => quantities[food.id] > 0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    city: "",
    district: "",
    zip: "",
  });

  const { shipping, tax, total } = calculateCartTotals(cartItems, quantities);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setIsProcessing(true);
    setError(null);

    try {
      const orderData = {
        userAddress: `${data.firstName} ${data.lastName}, ${data.address}, ${data.city}, ${data.district} District, ${data.zip}`,
        phoneNumber: data.phoneNumber,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        city: data.city,
        district: data.district,
        paymentMethod,
        amount: total.toFixed(2),
        orderedItems: cartItems.map((item) => ({
          foodId: item.id,
          quantity: quantities[item.id],
          price: item.price * quantities[item.id],
          category: item.category,
          imageUrl: item.imageUrl,
          description: item.description,
          name: item.name,
        })),
      };

      if (paymentMethod === "cod") {
        // Cash on Delivery — the backend confirms the order immediately
        // and returns it without a Stripe payment link.
        await axios.post(
          "http://localhost:8080/api/orders/create",
          orderData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setQuantities({});
        navigate("/myorders");
      } else {
        const response = await axios.post(
          "http://localhost:8080/api/orders/create",
          orderData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        window.location.href = response.data.paymentUrl;
      }
    } catch (error) {
      console.error("Order submission failed:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Failed to process order. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div>
      <div className="container mb-5">
        <main>
          <div className="mt-4 mb-4 text-center">
            <img
              src={assests.logo}
              alt="Prakruti Ayurveda"
              className="d-block mx-auto mb-3"
              width="72"
              height="72"
            />
            <span className="pk-eyebrow">Checkout</span>
            <h2 className="pk-section-title">Delivery & Payment Details</h2>
          </div>
          <div className="row g-5">
            {/* Cart Summary */}
            <div className="col-md-5 col-lg-4 order-md-last">
              <div className="pk-order-summary p-4">
                <h4 className="d-flex justify-content-between align-items-center mb-3">
                  <span>Your cart</span>
                  <span className="badge pk-badge-gold rounded-pill">
                    {cartItems.length}
                  </span>
                </h4>
                <ul className="list-group list-group-flush mb-3">
                  {cartItems.map((item) => (
                    <li
                      key={item.id}
                      className="list-group-item d-flex justify-content-between lh-sm px-0"
                    >
                      <div>
                        <h6 className="my-0">{item.name}</h6>
                        <small className="text-body-secondary">
                          Qty: {quantities[item.id]}
                        </small>
                      </div>
                      <span className="text-body-secondary">
                        LKR {(item.price * quantities[item.id]).toFixed(2)}
                      </span>
                    </li>
                  ))}

                  <li className="list-group-item d-flex justify-content-between px-0">
                    <span>Tax and Delivery</span>
                    <span>LKR {(tax + shipping).toFixed(2)}</span>
                  </li>

                  <li className="list-group-item d-flex justify-content-between px-0">
                    <span>Total (LKR)</span>
                    <strong className="pk-cart-total">{total.toFixed(2)}</strong>
                  </li>
                </ul>
              </div>
            </div>

            {/* Billing Address Form */}
            <div className="col-md-7 col-lg-8">
              <div className="pk-checkout-card p-4">
                <h4 className="mb-3">Delivery Address</h4>
                <form className="needs-validation" onSubmit={onSubmitHandler}>
                  <div className="row g-3">
                    <div className="col-sm-6">
                      <label htmlFor="firstName" className="form-label">
                        First name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        placeholder="Kamal"
                        required
                        name="firstName"
                        onChange={onChangeHandler}
                        value={data.firstName}
                      />
                    </div>

                    <div className="col-sm-6">
                      <label htmlFor="lastName" className="form-label">
                        Last name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        placeholder="Perera"
                        name="lastName"
                        onChange={onChangeHandler}
                        value={data.lastName}
                        required
                      />
                    </div>

                    <div className="col-12">
                      <label htmlFor="username" className="form-label">
                        Email
                      </label>
                      <div className="input-group has-validation">
                        <span className="input-group-text">@</span>
                        <input
                          type="email"
                          className="form-control"
                          id="username"
                          required
                          name="email"
                          onChange={onChangeHandler}
                          value={data.email}
                        />
                      </div>
                    </div>

                    <div className="col-12">
                      <label htmlFor="address" className="form-label">
                        Address
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="address"
                        placeholder="No. 45, Temple Road"
                        required
                        value={data.address}
                        name="address"
                        onChange={onChangeHandler}
                      />
                    </div>

                    <div className="col-12">
                      <label htmlFor="phone" className="form-label">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        placeholder="0771234567"
                        required
                        value={data.phoneNumber}
                        name="phoneNumber"
                        onChange={onChangeHandler}
                        pattern="0[0-9]{9}"
                        title="Enter a valid Sri Lankan mobile number, e.g. 0771234567"
                      />
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="district" className="form-label">
                        District
                      </label>
                      <select
                        className="form-select"
                        id="district"
                        required
                        name="district"
                        value={data.district}
                        onChange={onChangeHandler}
                      >
                        <option value="">Choose district...</option>
                        {SRI_LANKA_DISTRICTS.map((d) => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                    </div>

                    <div className="col-md-4">
                      <label htmlFor="city" className="form-label">
                        City / Town
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="city"
                        value={data.city}
                        id="city"
                        placeholder="e.g. Ambalangoda"
                        onChange={onChangeHandler}
                        required
                      />
                    </div>

                    <div className="col-md-2">
                      <label htmlFor="zip" className="form-label">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="zip"
                        placeholder="80500"
                        required
                        name="zip"
                        value={data.zip}
                        onChange={onChangeHandler}
                      />
                    </div>
                  </div>

                  <hr className="my-4" />

                  <h6 className="mb-3">Payment Method</h6>
                  <div className="d-flex flex-column gap-2 mb-4">
                    <label className={`pk-payment-option ${paymentMethod === "cod" ? "active" : ""}`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={paymentMethod === "cod"}
                        onChange={() => setPaymentMethod("cod")}
                      />
                      <i className="bi bi-cash-coin"></i>
                      <div>
                        <strong>Cash on Delivery</strong>
                        <p className="mb-0 small text-muted">Pay in cash when your order arrives — available island-wide.</p>
                      </div>
                    </label>
                    <label className={`pk-payment-option ${paymentMethod === "card" ? "active" : ""}`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={paymentMethod === "card"}
                        onChange={() => setPaymentMethod("card")}
                      />
                      <i className="bi bi-credit-card"></i>
                      <div>
                        <strong>Pay Online</strong>
                        <p className="mb-0 small text-muted">Secure card payment via our payment gateway.</p>
                      </div>
                    </label>
                  </div>

                  <button
                    className="w-100 btn btn-gold btn-lg"
                    type="submit"
                    disabled={cartItems.length === 0 || isProcessing}
                  >
                    {isProcessing ? "Processing..." : paymentMethod === "cod" ? "Place Order" : "Continue to Payment"}
                  </button>
                  {error && (
                    <div className="alert alert-danger mt-3">{error}</div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PlaceOrder;