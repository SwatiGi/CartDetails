import React from 'react';
import "./CartDetail.css";
import { useDispatch } from "react-redux";
import { cartActions } from '../store/cart-slice';
import axios from "axios"
const CartDetail = () => {
  const dummyProducts = [
    { id: "p1", price: 6, title: "My First Book", description: "The first book I ever wrote." },
    { id: "p2", price: 12, title: "The Art of Coding", description: "A beginner-friendly guide to mastering programming." },
    { id: "p3", price: 9, title: "Journey Through Space", description: "An exciting sci-fi adventure across the galaxy." },
    { id: "p4", price: 15, title: "Cooking with Love", description: "Delicious recipes for everyday meals made simple." },
    { id: "p5", price: 8, title: "Mindful Living", description: "Practical steps to bring peace and clarity into your life." },
    { id: "p6", price: 20, title: "The Startup Path", description: "A complete guide for building and scaling your business." }
  ];

  const dispatch = useDispatch();

  const addToCartHandler = (item) => {
    
    dispatch(cartActions.addItemToCart(
      
      {
      id: item.id,
      title: item.title,
      price: item.price,
    }));
  };

  return (
    <>
      <h1 className='h1'>BUY YOUR FAVORITE PRODUCTS</h1>
        {dummyProducts.map((item) => (
      <div className='Dcontainer'  key={item.id}>
          <div className='product-card'>
            <div className='detail-container'>
              <h2>{item.title}</h2>
              <button className='price-btn'>${item.price}</button>
            </div>

            <div className='data'>
              <p>{item.description}</p>
              <button
                className='add-btn'
                onClick={() => addToCartHandler(item)}
              >
                Add to Cart
              </button>
            </div>
          </div>
      </div>
        ))}
    </>
  );
};

export default CartDetail;

