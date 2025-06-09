import React, { useState } from 'react'
import "./Header.css"
import personal_logo from "./assets/personal-Logo.png"
import { HashLink } from 'react-router-hash-link';
const Header = () => {
  const [nav_open, set_nav_open] = useState(false)
  const handleOnclick = (e)=>{
    set_nav_open(!nav_open)
  }
  return (
    <header className={nav_open?"nav-open":""}>
        <HashLink className="logo" to={"/"}>
          <img src={personal_logo} alt="Letter J whit blue scale of colors inside" />
        </HashLink>
        <button onClick={handleOnclick} className="nav-toggle" aria-label="toggle navigation">
          <span className="hamburger"></span>
        </button>
        <nav className="nav">
          <ul className="nav__list">
            <li className="nav__item">
              <HashLink onClick={handleOnclick} to="/#home" className="nav__link">
                Home
              </HashLink>
            </li>
            <li className="nav__item">
              <HashLink onClick={handleOnclick} to="/#services" className="nav__link">
                My Services
              </HashLink>
            </li>
            <li className="nav__item">
              <HashLink onClick={handleOnclick} to="/#about" className="nav__link">
                About me
              </HashLink>
            </li>
            <li className="nav__item">
              <HashLink onClick={handleOnclick} to="/#work" className="nav__link">
                My Work
              </HashLink>
            </li>
            <li className="nav__item">
              <HashLink onClick={handleOnclick} to="/#contact" className="nav__link">
                Contact me
              </HashLink>
            </li>
          </ul>
        </nav>
      </header>
  )
}

export default Header