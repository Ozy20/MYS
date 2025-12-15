import React from 'react';
import './card.css';

function Card({ children, className = '', style = {}, onClick }) {
    return (
        <div
            className={`common-card ${className}`}
            style={style}
            onClick={onClick}
        >
            {children}
        </div>
    );
}

export default Card;
