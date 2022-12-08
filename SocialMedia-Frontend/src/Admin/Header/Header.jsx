import React from "react";
import { FaSignOutAlt } from "react-icons/fa";
import Logo from "../../img/logo1-removebg-preview.png";
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
    <header className="header">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>SOCIOUT</h1>
        <button
          className="button infoButton"
          style={{ zIndex: "500", marginTop: "25px" }}
          onClick={onLogout}
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;
