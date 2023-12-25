import React, { useState, useEffect } from 'react';
import Header from '../Common/Header/Header';
import "./IngredientPage.css"
import IngredientItem from '../Common/IngredientItem/IngredientItem';
import axios from 'axios';

function IngredientPage() {
    const [ingredients, setIngredients] = useState([]);
    const [notificationCount, setNotificationCount] = useState(0);
    const [selectedIngredients, setSelectedIngredients] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/v1/ingredient/getAllIngredient')
            .then((res) => {
                setIngredients(res.data);
            })
            .catch((error) => {
                console.error('Error fetching tables:', error);
            });
    }, []);

    const handleIngredientClick = (ingredient) => {
        // Tăng số lượng thông báo lên 1 khi người dùng nhấn vào một nguyên liệu
        setNotificationCount(notificationCount + 1);

        // Lưu thông tin nguyên liệu vào mảng selectedIngredients
        setSelectedIngredients([...selectedIngredients, ingredient]);
    };

    return (
        <div>
            <Header notificationCount={notificationCount} selectedIngredients={selectedIngredients} />
            <div className="ingredient-list">
                {ingredients?.map(ingredient => (
                    <IngredientItem
                        key={ingredient._id}
                        name={ingredient.ten_nguyen_lieu}
                        quantity={ingredient.khoi_luong_ton}
                        unit={ingredient.ma_loai_nguyen_lieu.ten_loai_nguyen_lieu}
                        onClick={() => handleIngredientClick(ingredient.ten_nguyen_lieu)}
                    />
                ))}
            </div>
        </div>
    );
}

export default IngredientPage;