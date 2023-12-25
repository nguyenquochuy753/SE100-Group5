import React, { useState } from 'react';
import "./NotifyBell.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

function NotifyBell({ count, selectedIngredients }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNotifyBell = () => {
        setIsOpen(!isOpen);
        console.log(isOpen)
    };

    const renderIngredients = () => {
        return (
            <ul>
                {selectedIngredients?.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
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
            <div className="notification-content">
                <h3>Thông báo</h3>
                {renderIngredients()}
            </div>
        </div>
    );
}

export default NotifyBell;