import React from "react";
import "./My_Services.css"
const services = () => {
  return (
    <section className="my-services" id="services">
      <h2 className="section__title section__title--services">What I do</h2>
      <div className="services">
        <div className="service">
          <h3>Front-end</h3>
          <p>If you have an idea, We can make it real.</p>
          <p>Don't care if is a static web page or web application</p>
          <ul className="service__list">
            <li>React</li>
            <li>Astro</li>
            <li>Css</li>
            <li>Sass</li>
            <li>Next.js</li>
          </ul>
        </div>
        <div className="service">
          <h3>Back-end</h3>
          <p>If you have problems whit your API, just contact me</p>
          <p>
            API REST, Data base design, Authorization, Authentication and more
          </p>
          <ul className="service__list">
            <li>JavaScript</li>
            <li>Python</li>
            <li>Golang</li>
            <li>Mongo</li>
            <li>PostgreSQL</li>
          </ul>
        </div>
        <div className="service">
          <h3>Dev-Ops</h3>
          <p> You want to host an application on aws just send me an email</p>
          <p>
            Dockerize you application for an automatic deploy
          </p>
          <ul className="service__list">
            <li>AWS</li>
            <li>Docker-compose</li>
            <li>Docker</li>
            <li>CI/CD</li>
          </ul>
        </div>
      </div>
      <a href="#work" className="btn">
        {" "}
        My Work
      </a>
    </section>
  );
};

export default services;
