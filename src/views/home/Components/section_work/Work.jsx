import "./Work.css";
import React from "react";
import { Link } from "react-router-dom";
const portfolioImages = require.context("./assets",true);
const portfolio_content = [
  { title: "t1", name:"portfolio-1.png", alt:"", finished:true },
  { title: "t2", name:"portfolio-2.png", alt:"", finished:false },
  { title: "t3", name:"portfolio-3.png", alt:"", finished:false },
  { title: "t4", name:"portfolio-4.png", alt:"", finished:false },
  { title: "t5", name:"portfolio-5.png", alt:"", finished:false },
  { title: "t6", name:"portfolio-6.png", alt:"", finished:false },
  { title: "t7", name:"portfolio-7.png", alt:"", finished:false },
  { title: "t7", name:"portfolio-8.png", alt:"", finished:false },
];
const Work = () => {
  const render_portfolio_item = (items) =>
    items.map((item, index) => (
      <Link key={`portfolio_item_${index}`} to={item.finished?`/project_${index+1}`:"/construction"} className="portfolio__item">
        <img
          className="portfolio__img"
          src={portfolioImages(`./${item.name}`)}
          alt={item.alt}
        />
      </Link>
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
