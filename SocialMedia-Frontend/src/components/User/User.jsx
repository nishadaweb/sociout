import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unfollowUser } from "../../actions/userAction";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Comment from "../../img/comment.png";
import { createChat } from "../../api/ChatRequest";
const User = ({ person }) => {
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useSelector((state) => state.authReducer.authData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [following, setFollowing] = useState(
    person.followers.includes(user._id)
  );
  const handleFollow = () => {
    console.log(user._id, "userid");
    console.log(person._id, "perid");
    following
      ? dispatch(unfollowUser(person._id, user))
      : dispatch(followUser(person._id, user));
    setFollowing((prev) => !prev);
  };
  const addToChat = () => {
    const chatData = {
      senderId: user._id,
      recieverId: person._id,
    };
    console.log(chatData);
    createChat(chatData);
    navigate("/chat/");
  };

  return (
    <div className="follower">
      <div>
        <img
          src={
            person.profilePicture
              ? publicFolder + person.profilePicture
              : publicFolder + "defaultProfile.png"
          }
          alt=""
          className="followerImage"
        />

        <div className="name">
          <span>
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to={`/profile/${person._id}`}
            >
              {person.username}
            </Link>
          </span>
        </div>
      </div>

      <img
        style={{ width: "15px", height: "15px", cursor: "pointer" }}
        onClick={addToChat}
        src={Comment}
        alt=""
      />

      <button
        className={
          following ? "button fc-button UnfollowButton" : "button fc-button"
        }
        onClick={handleFollow}
      >
        {following ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
};

export default User;
