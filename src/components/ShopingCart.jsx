import React from 'react';
import "./ShopingCart.css";
import { useSelector, useDispatch } from 'react-redux';
import { cartActions } from '../store/cart-slice';

const ShopingCart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const increaseHandler = (item) => {
    dispatch(cartActions.addItemToCart({
      id: item.id,
      title: item.title,
      price: item.price
    }));
  };

  const decreaseHandler = (id) => {
    dispatch(cartActions.removeItemFromCart(id));
  };

  return (
    <div className='container'>
      <h1>Your Shopping Cart</h1>

      {cartItems.length === 0 && <p>No items in cart.</p>}

          <div>
      {cartItems.map((item) => (
        <div className='item-container' key={item.id}>
          <div className='first-container'>
            <h2>{item.title}</h2>
            <h3>${item.totalPrice.toFixed(2)} (${item.price}/item)</h3>
          </div>

          <div className='second-container'>
            <h3>x{item.quantity}</h3>
            <div className='btn-group'>
              <button className='btn' onClick={() => decreaseHandler(item.id)}>-</button>
              <button className='btn' onClick={() => increaseHandler(item)}>+</button>
            </div>
              </div>
          </div>
        
      ))}
          </div>
          
    </div>
  );
};

export default ShopingCart;

