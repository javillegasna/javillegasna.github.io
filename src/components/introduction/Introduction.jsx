import React from "react";
import "./Introduction.css"
const Introduction = ({title,title_strong,subtitle,img}) => {
  return (
    <section className="intro" id="home">
      <h1 className="section__title section__title--intro">
        {title} <strong>{title_strong}</strong>
      </h1>
      <p className="section__subtitle section__subtitle--intro">
        {subtitle}
      </p>
      <img
        className="intro__img"
        src={img}
        alt="Picture of Javier VIllegas"
      />
    </section>
  );
};

export default Introduction;
