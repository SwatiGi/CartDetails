import React from 'react'
import "./Navbar.css"
import { useDispatch, useSelector } from 'react-redux'
import { uiActions } from '../store/ui-slice'
const Navbar = () => {
  const dispatch = useDispatch()
  const quantity = useSelector(state => state.cart.totalQuantity)
  console.log(quantity)
  let handleToggleCart = () => {
  dispatch(uiActions.toggle())
  }
  return (
      <nav className='nav'>
          <h1>ReduxCart</h1>
      <button className='cart-div' onClick={handleToggleCart} ><span>My Cart</span>
      <span className='count'>{quantity}</span>
      </button>
      
      </nav>
  )
}

export default Navbar