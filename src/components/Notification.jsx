import React from "react";
import "./Notification.css";
import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.ui.notification);

  if (!notification) return null; // agar koi notification nahi hai to kuch render mat karo

  let specialClasses = "";

  if (notification.status === "error") {
    specialClasses = "error";
  }
  if (notification.status === "success") {
    specialClasses = "success";
  }
  if (notification.status === "pending") {
    specialClasses = "pending";
  }

  const cssClasses = `notification ${specialClasses}`;

  return (
    <section className={cssClasses}>
      <p>{notification.title}</p>
      <p>{notification.message}</p>
    </section>
  );
};

export default Notification;
