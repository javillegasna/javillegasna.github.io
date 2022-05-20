import React from "react";
import "./Construction.css"
const Construction = () => {
  return (
    <div class="container-construction">
      <div class="card-construction">
        <div class="card__image-container">
          <img
            class="card__image"
            src={`https://images.unsplash.com/photo-1519999482648-25049ddd37b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2126&q=80`}
            alt=""
          />
        </div>

        <svg class="card__svg" viewBox="0 0 800 500">
          <path
            d="M 0 100 Q 50 200 100 250 Q 250 400 350 300 C 400 250 550 150 650 300 Q 750 450 800 400 L 800 500 L 0 500"
            stroke="transparent"
            fill="#333"
          />
          <path
            class="card__line"
            d="M 0 100 Q 50 200 100 250 Q 250 400 350 300 C 400 250 550 150 650 300 Q 750 450 800 400"
            stroke="pink"
            stroke-width="3"
            fill="transparent"
          />
        </svg>

        <div class="card__content">
          <h1 class="card__title">On Construction</h1>
        </div>
      </div>
    </div>
  );
};

export default Construction;
