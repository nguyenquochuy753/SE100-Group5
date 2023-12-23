import React from 'react';
import "./IngredientItem.css"

const IngredientItem = ({ name, quantity, unit }) => {
    return (
        <div className="ingredient-item">
            <h3>{name}</h3>
            <p>Quantity: {quantity} <b>{unit}</b></p>
        </div>
    );
};

export default IngredientItem;