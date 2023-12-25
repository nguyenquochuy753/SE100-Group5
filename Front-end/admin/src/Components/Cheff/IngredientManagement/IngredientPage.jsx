import React, { useState , useEffect } from 'react';
import Header from '../Common/Header/Header';
import "./IngredientPage.css"
import axios from 'axios';
import IngredientItem from '../Common/IngredientItem/IngredientItem';


function IngredientPage() {
    const [ingredients,setIngredients] = useState();
    useEffect(() => {
        axios.get('http://localhost:8000/v1/ingredient/getAllIngredient')
            .then((res) => {
                setIngredients(res.data);
            })
            .catch((error) => {
                console.error('Error fetching tables:', error);
            });
    }, []);
    return (
        <>
            <Header />
            <div className="ingredient-list">
                {ingredients?.map(ingredient => (
                    <IngredientItem
                        key={ingredient._id}
                        name={ingredient.ten_nguyen_lieu}
                        quantity={ingredient.khoi_luong_ton}
                        unit={ingredient.ma_loai_nguyen_lieu.ten_loai_nguyen_lieu}
                    />
                ))}
            </div>
        </>
    );
}

export default IngredientPage;
