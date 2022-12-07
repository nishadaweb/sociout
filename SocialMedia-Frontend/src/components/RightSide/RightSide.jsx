import React, { useState } from "react";
import "./RightSide.css";
import Home from "../../img/home.png";

import Comment from "../../img/comment.png";

import ShareModal from "../ShareModal/ShareModal";
import { Link } from "react-router-dom";
import FollowersCard from "../FollowersCard/FollowersCard";
const RightSide = () => {
  const [modalOpened, setModalOpened] = useState(false);
  return (
    <div className="RightSide">
      <div className="navIcon">
        <Link to="../home">
          <img src={Home} alt="" />
        </Link>

        <Link to="../chat/">
          <img src={Comment} alt="" />
        </Link>
      </div>

      <FollowersCard />
      <button className="button r-button" onClick={() => setModalOpened(true)}>
        Share
      </button>
      <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened} />
    </div>
  );
};

export default RightSide;
