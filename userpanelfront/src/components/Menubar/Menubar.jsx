import React, { useContext } from "react";
import "./Menubar.css";
import { assests } from "../../assets/assests";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { useState, useEffect } from "react";

const Menubar = () => {
  const { quantities, token, setToken, setQuantities } =
    useContext(StoreContext);
  const uniqueItemsInCart = Object.values(quantities || {}).filter(
    (qty) => qty > 0
  ).length;
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
    setQuantities({});
  };

  useEffect(() => {
    console.log("Current token value:", token);
    console.log("LocalStorage token:", localStorage.getItem("token"));
  }, [token]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`navbar navbar-expand-lg pk-navbar sticky-top ${
        scrolled ? "pk-navbar-scrolled" : ""
      }`}
    >
      <div className="container-fluid px-3 px-lg-4">
        <Link to="/" className="d-flex align-items-center text-decoration-none pk-brand-link">
          <span className="pk-logo-ring">
            <img
              src={assests.logo}
              alt="Prakruti Ayurveda"
              className="pk-logo-img"
              height={44}
              width={44}
            />
          </span>
          <span className="pk-brand-block">
            <span className="pk-brand">
              ප්‍රකෘති <span className="pk-brand-accent">Ayurveda</span>
            </span>
            
          </span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto px-5 mb-4 mb-lg-1 gap-lg-2">
            <li className="nav-item">
              <Link
                className={
                  active === "home" ? "nav-link fw-semibold active" : "nav-link"
                }
                to="/"
                onClick={() => setActive("home")}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={
                  active === "explore" ? "nav-link fw-semibold active" : "nav-link"
                }
                to="/explore"
                onClick={() => setActive("explore")}
              >
                Shop Products
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={
                  active === "myOrders" ? "nav-link fw-semibold active" : "nav-link"
                }
                to="/myorders"
                onClick={() => setActive("myOrders")}
              >
                My Orders
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={
                  active === "contact" ? "nav-link fw-semibold active" : "nav-link"
                }
                to="/contact"
                onClick={() => setActive("contact")}
              >
                Contact Us
              </Link>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-3">
            <Link to={`/cart`}>
              <div className="position-relative pk-cart-icon">
                <img
                  src={assests.cart}
                  alt="Cart"
                  height={24}
                  width={24}
                  className="position-relative"
                />
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill pk-badge-gold">
                  {uniqueItemsInCart}
                </span>
              </div>
            </Link>

            {!token || token === "" ? (
              <>
                <button
                  className="btn btn-outline-primary btn-sm rounded-pill px-3"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
                <button
                  className="btn btn-sm"
                  onClick={() => navigate("/register")}
                >
                  Register
                </button>
              </>
            ) : (
              <div className="dropdown position-relative">
                <a
                  href="#"
                  className="d-block link-body-emphasis text-decoration-none dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src={assests.profile}
                    width={32}
                    height={32}
                    className="rounded-circle"
                  />
                </a>
                <ul className="dropdown-menu dropdown-menu-end text-small">
                  <li className="dropdown-item" onClick={logout}>
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Menubar;