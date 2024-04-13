import React from "react";
import "./Navbar.scss";
import { SlArrowDown } from "react-icons/sl";
import logo from "../../assets/logo.png";
import Button from "../button/Button";

const Navbar = () => {
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
          <a href="#">Traffic Rules</a>
          <SlArrowDown style={{ color: "black" }} />
        </li>
        <li className="navbar__menu-item">
          <a href="/privacy_policy">Privacy Policy</a>
          <SlArrowDown style={{ color: "black" }} />
        </li>
        <li className="navbar__menu-item">
          <a href="https://parivahan.gov.in/parivahan//node/3">Contact Us</a>
        </li>
        <li className="navbar__menu-item">
          <Button children="Profile" onClick={handleClick} color="#100775" />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
