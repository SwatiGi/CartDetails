import React from 'react'
import Navbar from './components/Navbar'
import ShopingCart from './components/ShopingCart'
import CartDetail from './components/CartDetail'
import { useSelector } from 'react-redux'

const App = () => {
  const isShow = useSelector(state => state.ui.cartIsVisible);
  console.log(isShow)
  return (
    <div>
      <Navbar />
      {isShow&&<ShopingCart />}
      
      <CartDetail/>
    </div>
  )
}

export default App
