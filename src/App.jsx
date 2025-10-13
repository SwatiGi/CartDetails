import React, { Fragment, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import ShopingCart from "./components/ShopingCart";
import CartDetail from "./components/CartDetail";
import Notification from "./components/Notification";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { uiActions } from "./store/ui-slice";
import { cartActions, sendCartData } from "./store/cart-slice";

const App = () => {
  const dispatch = useDispatch();
  const isShow = useSelector((state) => state.ui.cartIsVisible);
  const notification = useSelector((state) => state.ui.notification);
  const cart = useSelector((state) => state.cart);
  const isInitial = useRef(true);

  
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const res = await axios.get(
          "https://productpage-ca999-default-rtdb.firebaseio.com/cart.json"
        );
        if (res.data) {
          dispatch(cartActions.replaceCart(res.data));
        }
      } catch (error) {
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Error!",
            message: "Fetching cart data failed!",
          })
        );
      }
    };
    fetchCartData();
  }, [dispatch]);


  useEffect(() => {
    if (isInitial.current) {
      isInitial.current = false;
      return;
    }
    dispatch(sendCartData(cart));
  }, [cart, dispatch]);

  
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        dispatch(uiActions.showNotification(null));
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [notification, dispatch]);

  return (
    <Fragment>
      {notification && <Notification {...notification} />}
      <Navbar />
      {isShow && <ShopingCart />}
      <CartDetail />
    </Fragment>
  );
};

export default App;



