import "./Work.css";
import React from "react";
const portfolioImages = require.context("./assets",true);
const portfolio_content = [
  { title: "t1", name:"portfolio-1.jpg", alt:"" },
  { title: "t2", name:"portfolio-2.jpg", alt:"" },
  { title: "t3", name:"portfolio-3.jpg", alt:"" },
  { title: "t4", name:"portfolio-4.jpg", alt:"" },
  { title: "t5", name:"portfolio-5.jpg", alt:"" },
  { title: "t6", name:"portfolio-6.jpg", alt:"" },
  { title: "t7", name:"portfolio-7.jpg", alt:"" },
  { title: "t7", name:"portfolio-8.jpg", alt:"" },
];
const Work = () => {
  const render_portfolio_item = (items) =>
    items.map((item, index) => (
      <a key={`portfolio_item_${index}`} href="./views/portfolio_item.html" className="portfolio__item">
        <img
          className="portfolio__img"
          src={portfolioImages(`./portfolio-${index+1}.jpg`)}
          alt=""
        />
      </a>
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
