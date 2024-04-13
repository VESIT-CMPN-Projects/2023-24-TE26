import React from 'react'
import "./AdminNavbar.scss"
import logo from "../../../assets/logo.png";
import Button from "../../button/Button";

const AdminNavbar = () => {
    const handleClick = () => {
        console.log("Profile Clicked");
      };
    return (
        <nav className="navbar">
          <div className="navbar__logo">
            <img src={logo} alt="logo" />
          </div>
          <ul className="navbar__menu">
            <li className="navbar__menu-item">
              <a href="#">Get All Cars</a>
            </li>
            <li className="navbar__menu-item">
              <a href="#">OverSpeeding Cars</a>
            </li>
            <li className="navbar__menu-item">
              <Button children='Profile' onClick={handleClick} color="#100775"></Button>
            </li>
          </ul>
        </nav>
      );
}

export default AdminNavbar