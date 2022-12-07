import React, { useEffect } from "react";
import "./Posts.css";

import Post from "../Post/Post";
import { useDispatch, useSelector } from "react-redux";
import { getTimelinePosts } from "../../actions/postAction";
import { useParams } from "react-router-dom";

const Posts = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { user } = useSelector((state) => state.authReducer.authData);
  let { posts, uploading } = useSelector((state) => state.postReducer);
  const refresh = useSelector((state) => state.postReducer.refresh);
  useEffect(() => {
    dispatch(getTimelinePosts(user._id));
  }, [refresh]);
  if (!posts) return "No Posts";
  if (params.id) posts = posts.filter((post) => post.userId === params.id);
  return (
    <div className="Posts">
      {uploading
        ? "Fetching posts"
        : posts.map((post, id) => {
            return <Post data={post} id={id} />;
          })}
    </div>
  );
};

export default Posts;
