import React from "react";
import dev_photography from "./assets/javier-01.jpg"
import "./Introduction.css"
const Introduction = () => {
  return (
    <section className="intro" id="home">
      <h1 className="section__title section__title--intro">
        Hi, I am <strong>Javier Villegas</strong>
      </h1>
      <p className="section__subtitle section__subtitle--intro">
        Full-stack developer
      </p>
      <img
        className="intro__img"
        src={dev_photography}
        alt="Picture of Javier VIllegas"
      />
    </section>
  );
};

export default Introduction;
