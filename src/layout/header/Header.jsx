import React, { useState } from 'react'
import "./Header.css"
import personal_logo from "./assets/personal-Logo.png"
const Header = () => {
  const [nav_open, set_nav_open] = useState(false)
  const handleOnclick = (e)=>{
    set_nav_open(!nav_open)
  }
  return (
    <header className={nav_open?"nav-open":""}>
        <div className="logo">
          <img src={personal_logo} alt="Letter J whit blue scale of colors inside" />
        </div>
        <button onClick={handleOnclick} className="nav-toggle" aria-label="toggle navigation">
          <span className="hamburger"></span>
        </button>
        <nav className="nav">
          <ul className="nav__list">
            <li className="nav__item">
              <a onClick={handleOnclick} href="/#home" className="nav__link">
                Home
              </a>
            </li>
            <li className="nav__item">
              <a onClick={handleOnclick} href="/#services" className="nav__link">
                My Services
              </a>
            </li>
            <li className="nav__item">
              <a onClick={handleOnclick} href="/#about" className="nav__link">
                About me
              </a>
            </li>
            <li className="nav__item">
              <a onClick={handleOnclick} href="/#work" className="nav__link">
                My Work
              </a>
            </li>
          </ul>
        </nav>
      </header>
  )
}

export default Header