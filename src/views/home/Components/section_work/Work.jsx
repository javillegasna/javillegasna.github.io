import "./Work.css";
import React from "react";
import CardProject from "./components/CardProject";
const portfolioImages = require.context("./assets",true);
const portfolio_content = [
  { 
    finished:true,
    title: "3D Cube animation",
    subtitle: "Pure css 3d animation" ,
    description: "Awesome 3d animation using just css",
    src:"3d-cube.png", 
    stack: [
      {label: "HTML", value:"30"},
      {label: "CSS", value:"70"}
    ]
  },

  { 
    finished:false, 
    title: "Pico Placa Predictor",
    subtitle: "Minimal React app for pico & placa" ,
    description: "Minimal react component to consult pico & placa by plate and date time",
    src:"pico-placa.png", 
    stack: [
      {label: "TypeScript", value:"100"},
      {label: "ReactJS", value:"76"},
      {label: "CSS", value:"8"},
      {label: "Jest", value:"14"}
    ] 
  },
  { 
    finished:false, 
    title: "Pocket Safe",
    subtitle: "Personal finance tracking" ,
    description: "Finance tracking application writhen on JS using MERN stack", 
    src:"pocket-safe.png",
    stack: [
      {label: "ReactJS", value:"34"},
      {label: "Express", value:"40"},
      {label: "Mongo", value:"16"}
    ]  
  },
];
const Work = () => {
  const render_portfolio_item = (items) =>
    items.map((item, index) => (
      <CardProject 
        index={index} 
        stack={item.stack} 
        src={portfolioImages(`./${item.src}`)}
        tag={item.finished? "Available": "On construction"}
        title={item.title}
        subtitle={item.subtitle}
        description={item.description}
        finished={item.finished}
      />
    ));
  return (
    <section className="my-work" id="work">
      <h2 className="section__title">My work</h2>
      <p className="section__subtitle section__subtitle--work">
        Give me an opinion
      </p>
      <div className="portfolio">
        {render_portfolio_item(portfolio_content)}
      </div>
    </section>
  );
};

export default Work;
