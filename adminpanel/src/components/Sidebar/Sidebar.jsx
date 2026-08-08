import React from 'react'
import { Link } from 'react-router-dom';
import { assets } from '../../assets/assets';

const Sidebar = ({ sidebarVisible }) => {
  return (
    <div className={`border-end bg-white pk-sidebar ${sidebarVisible ? '' : 'd-none'}`} id="sidebar-wrapper">
      <div className="sidebar-heading border-bottom d-flex align-items-center gap-2 px-3">
        <img src={assets.logo} alt="Prakruti Ayurveda" height={40} width={40} />
        <span className="pk-admin-brand">Prakruti <span>Admin</span></span>
      </div>
      <div className="list-group list-group-flush">
        <Link className="list-group-item list-group-item-action p-3" to="/add">
          <i className="bi bi-plus-circle me-2"></i>Add Product
        </Link>
        <Link className="list-group-item list-group-item-action p-3" to="/list">
          <i className="bi bi-list-ul me-2"></i>Product List
        </Link>
        <Link className="list-group-item list-group-item-action p-3" to="/orders">
          <i className="bi bi-bag-check me-2"></i>Orders
        </Link>
      </div>
    </div>
  )
}

export default Sidebar;