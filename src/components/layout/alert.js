import style from "./Alert.module.css";
import { useState } from "react";

export default function Alert({ children, type, message, isShow, setIsShow }) {
  const showClassname = isShow ? "" : style.hide;
  const defaultTypes = [
    "info",
    "success",
    "error",
    "warning",
    "primary",
    "secondary",
  ];

  const handleClose = (e) => {
    e.preventDefault();
    setIsShow((prev) => !prev);
  };

  return (
    <div className={showClassname}>
      {defaultTypes.includes(type) ? (
        <div className={style.alert + " " + style[type]}>
          <span className={style.closebtn} onClick={handleClose}>
            &times;
          </span>
          {message}
        </div>
      ) : (
        "No Type"
      )}
    </div>
  );
}
