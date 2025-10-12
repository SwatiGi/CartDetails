import React, { Fragment, useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import ShopingCart from "./components/ShopingCart";
import CartDetail from "./components/CartDetail";
import Notification from "./components/Notification";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { uiActions } from "./store/ui-slice";
import { cartActions } from "./store/cart-slice";

const App = () => {
  const dispatch = useDispatch();
  const isShow = useSelector((state) => state.ui.cartIsVisible);
  const notification = useSelector((state) => state.ui.notification);
  const cart = useSelector((state) => state.cart);

  const [isInitial, setIsInitial] = useState(true);

  // 🟢 Fetch cart data from Firebase
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

  // 🔵 Send cart data when updated
  useEffect(() => {
    if (isInitial) {
      setIsInitial(false);
      return;
    }

    const sendCartData = async () => {
      dispatch(
        uiActions.showNotification({
          status: "pending",
          title: "Sending...",
          message: "Sending cart data!",
        })
      );
      try {
        await axios.put(
          "https://productpage-ca999-default-rtdb.firebaseio.com/cart.json",
          cart
        );
        dispatch(
          uiActions.showNotification({
            status: "success",
            title: "Success!",
            message: "Cart data sent successfully!",
          })
        );
      } catch (error) {
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Error!",
            message: "Error cart data failed!",
          })
        );
      }
    };

    sendCartData();
  }, [cart, dispatch]);

  // 🕒 Auto-hide notification after 2s
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
      {notification && <Notification />}
    <div>
      <Navbar />
      {isShow && <ShopingCart />}
      <CartDetail />
    </div>
</Fragment>
  );
};

export default App;


