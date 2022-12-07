import React from "react";
import "./Navigation.css";
import { useSelector } from "react-redux";

import Home from "../../img/home.png";
import followers from "../../img/following.png";
import Comment from "../../img/comment.png";
import profile from "../../img/profile.png";
import { Link } from "react-router-dom";

const Navigation = () => {
  const { user } = useSelector((state) => state.authReducer.authData);
  console.log(user, "userrrrrrr");
  return (
    <div className="navIcons navigation">
      <Link to="../home">
        <img src={Home} alt="" />
      </Link>
      <Link
        style={{
          textDecoration: "none",
          color: "inherit",
        }}
        to={`/profile/${user._id}`}
      >
        <img src={profile} alt="" />
      </Link>
      <Link to="/followers">
        <img src={followers} alt="" />
      </Link>
      <Link to="../chat">
        <img src={Comment} alt="" />
      </Link>
    </div>
  );
};

export default Navigation;
