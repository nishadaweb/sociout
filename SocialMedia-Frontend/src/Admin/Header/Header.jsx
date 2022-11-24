import React from "react";
import { FaSignOutAlt } from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../../actions/AuthAction";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);

  const onLogout = () => {
    dispatch(logOut());
    navigate("/");
  };

  return (
    <header
      className="header"
      style={{ display: "flex", flexDirection: "row-reverse" }}
    >
      {/* <div className="logo" style={{ marginLeft: 50 }}></div> */}
      {/* <ul style={{ marginRight: 50 }}> */}
      <button
        className="button infoButton"
        style={{ zIndex: "500" }}
        onClick={onLogout}
      >
        <FaSignOutAlt />
        Logout
      </button>
      {/* </ul> */}
    </header>
  );
}

export default Header;
