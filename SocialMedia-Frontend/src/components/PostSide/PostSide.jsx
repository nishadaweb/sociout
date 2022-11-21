import React from "react";
import PostShare from "../PostShare/PostShare";
import "./PostSide.css";
import Posts from "../Posts/Posts";
const PostSide = () => {
  return (
    <div className="Postside">
      <PostShare />
      <Posts />
    </div>
  );
};

export default PostSide;
