import React, { useState, useEffect } from 'react';
import './NotifyBell.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faPlus, faMinus, faTimes } from '@fortawesome/free-solid-svg-icons';

function NotifyBell({ count, selectedIngredients }) {
    const [isOpen, setIsOpen] = useState(false);
    const [ingredientList, setIngredientList] = useState([]);

    useEffect(() => {
        if (selectedIngredients && selectedIngredients.length > 0) {
            setIngredientList(selectedIngredients.map(ingredient => ({ name: ingredient, quantity: 1 })));
        }
    }, [selectedIngredients]);

    const toggleNotifyBell = () => {
        setIsOpen(!isOpen);
    };

    const handleIncrease = (index) => {
        const updatedList = [...ingredientList];
        updatedList[index].quantity += 1;
        setIngredientList(updatedList);
    };

    const handleDecrease = (index) => {
        const updatedList = [...ingredientList];
        if (updatedList[index].quantity > 1) {
            updatedList[index].quantity -= 1;
            setIngredientList(updatedList);
        }
    };

    const handleRemoveIngredient = (indexToRemove) => {
        const updatedList = [...ingredientList];
        updatedList.splice(indexToRemove, 1);
        setIngredientList(updatedList);
        count = count - 1;
    };

    console.log(ingredientList)

    const renderIngredients = () => {
        return (
            <ul>
                {ingredientList?.map((ingredient, index) => (
                    <div className="ingredient-item1" key={index}>
                        <span>{ingredient.name}</span>
                        <div className="quantity-actions">
                            <button onClick={() => handleDecrease(index)}>
                                <FontAwesomeIcon icon={faMinus} />
                            </button>
                            <span className="quantity">{ingredient.quantity}</span>
                            <button onClick={() => handleIncrease(index)}>
                                <FontAwesomeIcon icon={faPlus} />
                            </button>
                            <button onClick={() => handleRemoveIngredient(index)}>
                                <FontAwesomeIcon icon={faTimes} />
                            </button>
                        </div>
                    </div>
                ))}
                <button className='confirm-btn'>Xác nhận</button>
            </ul>
        );
    };

    return (
        <div className="notification-bell">
            <div className="bell-icon" onClick={toggleNotifyBell}>
                <FontAwesomeIcon icon={faBell} />
                {count > 0 && (
                    <div className="notification-count">{count}</div>
                )}
            </div>
            <div className={`notification-content ${isOpen ? 'open' : ''}`}>
                {renderIngredients()}
            </div>
        </div>
    );
}

export default NotifyBell;
