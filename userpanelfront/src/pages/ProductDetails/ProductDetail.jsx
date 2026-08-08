import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import { fetchFoodDetails } from '../../service/Productservice';
import { StoreContext } from '../../context/StoreContext';
import './ProductDetail.css';

const FoodDetail = () => {
  const { id } = useParams();
  const { increaseQuantity, quantities } = useContext(StoreContext);
  const navigate = useNavigate();

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFoodDetails = async () => {
      try {
        setLoading(true);
        const foodData = await fetchFoodDetails(id);
        setData(foodData);
      } catch {
        toast.error('Error displaying the product details.');
      } finally {
        setLoading(false);
      }
    };
    loadFoodDetails();
  }, [id]);

  const addToCart = () => {
    increaseQuantity(data.id);
    navigate('/cart');
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border" style={{ color: 'var(--pk-green-700)' }} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <section className="py-5">
      <div className="container px-4 px-lg-5 my-3">
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb pk-breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item"><Link to="/explore">Shop</Link></li>
            <li className="breadcrumb-item active" aria-current="page">{data.name}</li>
          </ol>
        </nav>

        <div className="row gx-4 gx-lg-5 align-items-center">
          <div className="col-md-6">
            <div className="pk-detail-media">
              <img src={data.imageUrl} alt={data.name} />
            </div>
          </div>
          <div className="col-md-6">
            <span className="pk-category-pill mb-3 d-inline-block">{data.category}</span>
            <h1 className="pk-detail-title">{data.name}</h1>
            <div className="pk-detail-rating mb-3">
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-half"></i>
              <span className="text-muted ms-2 small">(4.5 · 120 reviews)</span>
            </div>
            <div className="pk-detail-price mb-4">
              LKR {data.price}
            </div>
            <p className="lead pk-detail-desc">{data.description}</p>

            <ul className="list-unstyled pk-detail-trust mb-4">
              <li><i className="bi bi-patch-check-fill me-2"></i>100% Natural, Chemical-Free</li>
              <li><i className="bi bi-truck me-2"></i>Delivered island-wide across Sri Lanka</li>
              <li><i className="bi bi-cash-coin me-2"></i>Cash on Delivery available</li>
            </ul>

            <div className="d-flex gap-3">
              <button className="btn btn-gold btn-lg flex-shrink-0" type="button" onClick={addToCart}>
                <i className="bi-bag-plus me-2"></i>
                Add to Cart
              </button>
              <Link to="/explore" className="btn btn-outline-primary btn-lg">
                Continue Shopping
              </Link>
            </div>
            {quantities && quantities[data.id] > 0 && (
              <p className="mt-3 small text-muted">
                <i className="bi bi-check-circle-fill me-1" style={{ color: 'var(--pk-green-700)' }}></i>
                {quantities[data.id]} already in your cart
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoodDetail;