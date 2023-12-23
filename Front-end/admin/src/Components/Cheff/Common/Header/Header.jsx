import React from 'react'
import './Header.css'
import logo from "./logo_restaurant-removebg-preview.png";
import {Link} from "react-router-dom"

function Header() {
  return (
    <div>
        <header className="header">
            <div className="logo">
                <img src={logo} alt="Logo" />
            </div>
            <div className="header-buttons">
                <button>
                  <Link to="/orderManagement">Chuẩn bị món ăn</Link>
                </button>
                <button>
                  <Link to="/ingredient">Nguyên liệu</Link>
                </button>
            </div>
        </header>
    </div>
  )
}

export default Header
