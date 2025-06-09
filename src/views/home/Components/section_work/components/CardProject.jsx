import React from "react";
import { Link } from "react-router-dom";
import "./CardProject.css"
const CardProject = (props) => {
    const renderCardItems = (items) => {
        return items.map((item, index) => (
            <div key={`card_detail_item_${props.index}_${index}`}  class="detail-item">
                <div class="detail-value">{item.value}</div>
                <div class="detail-label">{item.label}</div>
            </div>
        ))
    }
    return (
        <div key={`card_project_${props.index}`} class="card">
            <div class="card-shapes">
                <div class="shape shape-1"></div>
                <div class="shape shape-2"></div>
                <div class="shape shape-3"></div>
            </div>

            <img 
                class="card-image"
                
                src={props.src}
                alt=""
            />
            <div class="card-overlay"></div>

            <div class="card-header">
                <span class="card-tag">{props.tag}</span>
                <h2 class="card-title">{props.title}</h2>
                <p class="card-subtitle">{props.subtitle}</p>
            </div>

            <div class="card-content">
                <p class="card-description">
                    {props.description}
                </p>
                <div class="card-details">
                    {renderCardItems(props.stack)}
                </div>

                <Link 
                    to={props.finished ? `/project_${props.index + 1}` : "/construction"}
                    class="card-button"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
}

export default CardProject