import { useState, useRef } from "react";
import styles from "./TableAction.module.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch } from "react-redux";

import { deleteProduct } from "../../store/slice/product.js";

export default function NotificationDropdown({ id }) {
  const dispatch = useDispatch();
  const removeHandler = () => {
    dispatch(deleteProduct(id));
  };

  const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);
  const btnDropdownRef = useRef();
  const popoverDropdownRef = useRef();
  const openDropdownPopover = () => {
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  return (
    <>
      <a
        className={styles.icon}
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <BsThreeDotsVertical />
      </a>
      <div
        ref={popoverDropdownRef}
        className={styles.container}
        style={{ display: dropdownPopoverShow ? "block" : "none" }}
      >
        <a
          className={styles.links + " "}
          href={`${process.env.REACT_APP_FRONTEND_SERVER_PRODUCT}/${id}`}
          target="_blank"
          onClick={(e) => e.preventDefault()}
        >
          Preview
        </a>
        <a
          className={styles.links + " " + styles.warning}
          onClick={removeHandler}
        >
          Delete
        </a>
      </div>
    </>
  );
}
