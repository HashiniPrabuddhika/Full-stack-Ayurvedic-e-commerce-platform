import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../ProductItem/ProductItem";
import "./FeaturedProducts.css";

const FeaturedProducts = () => {
  const { foodList } = useContext(StoreContext);
  const featured = foodList.slice(0, 8);

  if (featured.length === 0) return null;

  return (
    <section className="pk-featured py-5">
      <div className="container">
        <div className="d-flex align-items-end justify-content-between flex-wrap mb-4">
          <div>
            <span className="pk-eyebrow">Best Sellers</span>
            <h2 className="pk-section-title mb-0">Loved by Our Customers</h2>
          </div>
          <Link to="/explore" className="btn btn-outline-primary rounded-pill px-4">
            View All Products
          </Link>
        </div>
        <div className="row">
          {featured.map((food) => (
            <FoodItem
              key={food.id}
              id={food.id}
              name={food.name}
              description={food.description}
              imageUrl={food.imageUrl}
              price={food.price}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;