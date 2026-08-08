import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import './ListProduct.css';
import { getFoodList, deleteFood } from '../../services/ProductService';

const ListFood = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchList = async () => {
    try {
      setLoading(true);
      const data = await getFoodList();
      setList(data);
    } catch (error) {
      console.error('Error while fetching product list:', error);
      toast.error('Error while fetching product list.');
    } finally {
      setLoading(false);
    }
  };

  const removeFood = async (foodId) => {
    if (!window.confirm('Remove this product from the store?')) return;
    try {
      const success = await deleteFood(foodId);
      if (success) {
        toast.success('Product deleted successfully.');
        fetchList();
      }
    } catch (error) {
      console.error('Error while deleting product:', error);
      toast.error('Error while deleting product.');
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="py-4 row justify-content-center">
      <div className="col-12">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <div>
            <span className="pk-eyebrow">Inventory</span>
            <h2 className="pk-admin-title mb-0">All Ayurvedic Products</h2>
          </div>
          <span className="badge pk-count-badge">{list.length} items</span>
        </div>

        <div className="card pk-admin-card">
          <div className="table-responsive">
            <table className="table pk-product-table mb-0">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th className="text-end">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="text-center py-4 text-muted">Loading products...</td>
                  </tr>
                ) : list.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-4 text-muted">No products added yet.</td>
                  </tr>
                ) : (
                  list.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <img src={item.imageUrl} alt={item.name} height={48} width={48} className="pk-thumb" />
                      </td>
                      <td className="fw-medium">{item.name}</td>
                      <td>
                        <span className="pk-category-pill">{item.category}</span>
                      </td>
                      <td>Rs. {item.price}.00</td>
                      <td className="text-end">
                        <i
                          className="bi bi-trash3 pk-delete-icon"
                          onClick={() => removeFood(item.id)}
                          title="Delete product"
                        ></i>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListFood;