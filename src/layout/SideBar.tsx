import React from "react";
import "./Layout.scss";
import Logo from "../assets/logo.png";
import {BsGithub, BsLinkedin} from "react-icons/bs";
const SideBar = () => {
  return (
    <aside className="sidebar">
      <div className="container_logo">
        <img className="sidebar__logo" src={Logo} alt="" />
        <p className="sidebar__name">
          Javier
        </p>
        <p className="sidebar__rol">
          Web Developer
        </p>
      </div>
      <ul className="sidebar__links">
        <li>
          <a className="active" href="#home">Home</a>
        </li>
        <li>
          <a href="#home">My Skills</a>
        </li>
        <li>
          <a href="#home">Work</a>
        </li>
        <li>
          <a href="#home">Contact</a>
        </li>
      </ul>

      <div className="contact_container">
        <a href="/"><BsGithub/></a>
        <a href="/"><BsLinkedin/></a>
      </div>
    </aside>
  );
};

export default SideBar;
