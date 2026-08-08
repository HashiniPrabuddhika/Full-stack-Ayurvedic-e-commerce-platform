import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { assests } from "../../assets/assests";
import "./MyOrders.css";

const MyOrders = () => {
  const { token } = useContext(StoreContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8080/api/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(response.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  const statusBadgeClass = (status) => {
    switch (status) {
      case "deliverd":
      case "delivered":
        return "pk-status-delivered";
      case "pending":
        return "pk-status-pending";
      case "cancelled":
        return "pk-status-cancelled";
      default:
        return "pk-status-processing";
    }
  };

  return (
    <div className="container my-5">
      <span className="pk-eyebrow">Account</span>
      <h1 className="pk-section-title mb-4">My Orders</h1>
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10">
          <div className="card pk-orders-card">
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0 pk-orders-table">
                  <thead>
                    <tr>
                      <th scope="col" style={{ width: "60px" }}></th>
                      <th scope="col">Items</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Payment</th>
                      <th scope="col">Status</th>
                      <th scope="col" style={{ width: "50px" }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan={6} className="text-center py-5 text-muted">Loading your orders...</td>
                      </tr>
                    ) : data.length === 0 ? (
                      <tr>
                        <td colSpan={6}>
                          <div className="text-center py-5">
                            <i className="bi bi-box-seam display-5 text-muted"></i>
                            <p className="mt-3 text-muted">No orders found</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      data.map((order, index) => (
                        <tr key={index} className="align-middle">
                          <td>
                            <div className="pk-order-icon">
                              <img src={assests.delivery} alt="" height={28} width={28} />
                            </div>
                          </td>
                          <td>
                            <div className="text-truncate" style={{ maxWidth: "260px" }}>
                              {order.orderedItems.map((item, idx) => (
                                <span key={idx}>
                                  {item.name} × {item.quantity}
                                  {idx !== order.orderedItems.length - 1 && ", "}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="fw-bold">LKR {order.amount.toFixed(2)}</td>
                          <td>
                            <span className="small text-muted text-capitalize">
                              {order.paymentMethod === "cod" ? "Cash on Delivery" : "Online Payment"}
                            </span>
                          </td>
                          <td>
                            <span className={`badge rounded-pill ${statusBadgeClass(order.orderStatus)}`}>
                              {order.orderStatus}
                            </span>
                          </td>
                          <td>
                            <button
                              className="btn btn-sm btn-outline-secondary rounded-circle"
                              onClick={fetchOrders}
                              title="Refresh"
                            >
                              <i className="bi bi-arrow-clockwise"></i>
                            </button>
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
      </div>
    </div>
  );
};

export default MyOrders;