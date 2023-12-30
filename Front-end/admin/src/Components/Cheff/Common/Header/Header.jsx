import React from 'react';
import './Header.css';
import logo from "../Header/logo_restaurant-removebg-preview.png";
import { Link } from "react-router-dom";
import NotificationBell from '../NotifyBell/NotifyBell';

function Header({ notificationCount, selectedIngredients }) {
  return (
    <div>
      <header className="header">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="header-buttons">
          <NotificationBell count={notificationCount} selectedIngredients={selectedIngredients} />
          <button>
            <Link to="/cuba-context/dashboard/cheff/order">Chuẩn bị món ăn</Link>
          </button>
          <button>
            <Link to="/cuba-context/dashboard/cheff/ingredient">Nguyên liệu</Link>
          </button>
        </div>
      </header>
    </div>
  );
}

export default Header;
