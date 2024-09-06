import React from "react";
import { useDispatch } from "react-redux";

// import authService from "../../appwrite/config";     // written by sir
import authService from "../../appwrite/auth";          // corrected written by by

import { logout } from "../../store/authSlice";

// logoutBtn will be conditional render
function LogoutBtn() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    authService
      .logout()
      .then(() => {
        dispatch(logout());
      })
      .catch((err) => { 
        console.log("err in logoutbtn(header)", err);
      });

    // .catch made by own
  };

  return (
    <button className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}
// import authService from '../../appwrite/auth'

export default LogoutBtn;
