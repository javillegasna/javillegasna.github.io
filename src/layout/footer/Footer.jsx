import React from 'react'
import "./Footer.css"
import { FaGithub, FaLinkedin } from 'react-icons/fa';
const Footer = () => {
  return (
    <footer className="footer">
        <a href="mailto:javillegasna@gmail.com" className="footer__link">
          javillegasna@gmail.com
        </a>
        <ul className="social-list">
          <li className="social-list__item">
            <a href="https://www.linkedin.com/in/javiervillegasnaranjo" target="_blank" className="social-list__link">
              <FaLinkedin/>
            </a>
          </li>
          <li className="social-list__item">
            <a href="https://github.com/javillegasna" target="_blank" className="social-list__link">
              <FaGithub/>
            </a>
          </li>
        </ul>
      </footer>
  )
}

export default Footer