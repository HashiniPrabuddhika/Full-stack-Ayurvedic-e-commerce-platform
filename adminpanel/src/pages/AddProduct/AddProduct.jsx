import React, { useState } from 'react'
import { assets } from '../../assets/assets';
import { addFood } from '../../services/ProductService';
import { toast } from 'react-toastify';

const categories = [
  'Leaves',
  'Flowers',
  'Roots',
  'Bark & Stems',
  'Seeds',
  'Oils & Ghee',
  'Powders',
  'Herbal Tea',
];

const AddFood = () => {
  const [image, setImage] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [data, setData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Leaves',
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!image) {
      toast.error('Please select a product image.');
      return;
    }

    try {
      setSubmitting(true);
      await addFood(data, image);
      toast.success('Ayurvedic product added successfully');
      setData({ name: '', description: '', category: 'Leaves', price: '' });
      setImage(false);
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Error adding product.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-2 mt-2 pk-admin-page">
      <div className="row">
        <div className="card col-md-5 pk-admin-card">
          <div className="card-body">
            <span className="pk-eyebrow">Inventory</span>
            <h2 className="mb-4 pk-admin-title">Add Ayurvedic Product</h2>
            <form onSubmit={onSubmitHandler}>
              <div className="mb-3">
                <label htmlFor="image" className="form-label d-block">
                  Product Photo
                </label>
                <label htmlFor="image" className="pk-upload-box">
                  <img
                    src={image ? URL.createObjectURL(image) : assets.upload}
                    alt=""
                    width={image ? '100%' : 60}
                    className={image ? 'pk-upload-preview' : ''}
                  />
                  {!image && <span className="pk-upload-hint">Click to upload image</span>}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="form-control"
                  id="image"
                  hidden
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Product Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Organic Ashwagandha Root"
                  className="form-control"
                  id="name"
                  required
                  name="name"
                  onChange={onChangeHandler}
                  value={data.name}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  className="form-control"
                  placeholder="Describe the origin, benefits and usage of this herb..."
                  id="description"
                  rows="5"
                  required
                  name="description"
                  onChange={onChangeHandler}
                  value={data.description}
                ></textarea>
              </div>

              <div className="mb-3">
                <label htmlFor="category" className="form-label">
                  Category
                </label>
                <select
                  name="category"
                  id="category"
                  className="form-control"
                  onChange={onChangeHandler}
                  value={data.category}
                >
                  {categories.map((cat) => (
                    <option value={cat} key={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="price" className="form-label">
                  Price (LKR)
                </label>
                <input
                  type="number"
                  placeholder="Rs. 450"
                  name="price"
                  className="form-control"
                  id="price"
                  required
                  min="0"
                  onChange={onChangeHandler}
                  value={data.price}
                />
              </div>

              <button type="submit" className="btn btn-primary w-100" disabled={submitting}>
                {submitting ? 'Saving...' : 'Save Product'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFood;