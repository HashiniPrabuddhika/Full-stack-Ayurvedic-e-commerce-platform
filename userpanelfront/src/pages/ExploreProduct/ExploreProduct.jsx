import React, { useState } from 'react'
import FoodDisplay from '../../components/ProductDisplay/ProductDisplay';
import { catagories } from '../../assets/assests';
import './ExploreProduct.css';

const ExploreFood = () => {
  const [category, setCategory] = useState('All');
  const [searchText, setSearchText] = useState('');

  return (
    <>
      <div className="container pk-explore-header">
        <span className="pk-eyebrow">Shop</span>
        <h1 className="pk-section-title mb-4">All Ayurvedic Products</h1>
        <div className="row justify-content-center">
          <div className="col-md-8">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="input-group mb-3 pk-search-group">
                <select
                  className="form-select"
                  style={{ maxWidth: '190px' }}
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                >
                  <option value="All">All Categories</option>
                  {catagories.map((c) => (
                    <option value={c.category} key={c.category}>
                      {c.icon} {c.category}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search for herbs, oils, teas..."
                  onChange={(e) => setSearchText(e.target.value)}
                  value={searchText}
                />
                <button className="btn btn-gold" type="submit">
                  <i className="bi bi-search"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <FoodDisplay category={category} searchText={searchText} />
    </>
  );
};

export default ExploreFood;