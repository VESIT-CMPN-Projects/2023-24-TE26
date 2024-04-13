import React from 'react'
import './Header.scss'
import logo from '../../assets/logo.png'

function Header() {
  return (
    <>
        <div className="header">
            <img src={logo} alt="logo" />
        </div>
    </>
  )
}

export default Header