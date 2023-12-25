import React from 'react';
import "./NotifyBell.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

function NotificationBell({ count }) {
    return (
        <div className="notification-bell">
            <FontAwesomeIcon icon={faBell} className="bell-icon" />
            {count > 0 && <span className="notification-count">{count}</span>}
        </div>
    );
}

export default NotificationBell;