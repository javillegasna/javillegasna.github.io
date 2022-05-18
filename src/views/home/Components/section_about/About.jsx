import React from "react";
import "./About.css"
import about_me from "./Assets/About_Me.png"
const About = () => {
  return (
    <section className="about-me" id="about">
      <h2 className="section__title section__title--about">Who I am</h2>
      <p className="section__subtitle section__subtitle--about">
        Web developer (JavaScript & Python)
      </p>
      <div className="about-me__body">
        <p>
          Mechatronics engineer with more than 2 years of experience in projects
          with projects with Raspberry, stm32 and esp8266, using analog, digital
          and IOT sensors. analog, digital and IOT sensors. Skilled in
          programming in languages such as C++, Python and JavaScript.
        </p>
        <p>
          Specialist in JavaScript derived technologies such as React, Node,
          Express and Typescript. Typescript. Additional within web development
          I have knowledge of both FontEnd and Backend. My stack of choice is
          MERN with which I have 4 months of experience.
        </p>
      </div>
      <img
        className="about-me__img"
        src={about_me}
        alt="Javier Villegas leaning whit the tittle"
      />
    </section>
  );
};

export default About;
