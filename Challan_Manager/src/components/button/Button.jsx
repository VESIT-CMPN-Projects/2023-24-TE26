import React from 'react'
import './Button.scss'

function Button({ children,onClick, color}) {
  const buttonStyle = {
    backgroundColor: color,
    color: color === "#ffffff" ? "black" : "white",
  };
    return (
        <button style={buttonStyle} className="button" onClick={onClick}>
          {children}
        </button>
      );
}

export default Button