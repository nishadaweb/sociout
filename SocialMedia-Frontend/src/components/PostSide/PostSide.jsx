import React from "react";
import PostShare from "../PostShare/PostShare";
import "./PostSide.css";
import Posts from "../Posts/Posts";
import Navigation from "../Navigation/Navigation";
const PostSide = () => {
  return (
    <div className="Postside">
      <PostShare />
      <Navigation />
      <Posts />
    </div>
  );
};

export default PostSide;
