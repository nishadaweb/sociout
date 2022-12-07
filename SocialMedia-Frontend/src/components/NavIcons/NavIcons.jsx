import React from "react";

import Home from "../../img/home.png";

import Comment from "../../img/comment.png";

import { Link } from "react-router-dom";

const NavIcons = () => {
  return (
    <div className="navIcon" style={{}}>
      <Link to="../home">
        <img src={Home} alt="" />
      </Link>
      <Link to="../chat">
        <img src={Comment} alt="" />
      </Link>
    </div>
  );
};

export default NavIcons;
