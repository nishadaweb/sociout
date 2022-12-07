import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../ProfileCard/ProfileCard.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as userApi from "../../api/UserRequest.js";
const ProfileCard = ({ location }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  console.log(user, "userrrrrrr");
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const posts = useSelector((state) => state.postReducer.posts);
  const [profileUser, setProfileUser] = useState({});
  const params = useParams();
  const profileUserId = params.id;

  useEffect(() => {
    const fetchProfileUser = async () => {
      if (profileUserId === user._id) {
        setProfileUser(user);
      } else {
        const profileUser = await userApi.getUser(profileUserId);
        console.log(profileUser, "otheruser");
        setProfileUser(profileUser);
      }
    };
    fetchProfileUser();
  }, [user]);

  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        {user._id === profileUserId ? (
          <img
            src={
              profileUser.coverPicture
                ? serverPublic + profileUser.coverPicture
                : serverPublic + "defaultCover.jpg"
            }
            alt="CoverImage"
          />
        ) : (
          <img
            src={
              profileUser?.data?.coverPicture
                ? serverPublic + profileUser?.data?.coverPicture
                : serverPublic + "defaultCover.jpg"
            }
            alt="CoverImage"
          />
        )}
        {user._id === profileUserId ? (
          <img
            src={
              profileUser.profilePicture
                ? serverPublic + profileUser.profilePicture
                : serverPublic + "defaultProfile.png"
            }
            alt="ProfileImage"
          />
        ) : (
          <img
            src={
              profileUser?.data?.profilePicture
                ? serverPublic + profileUser?.data?.profilePicture
                : serverPublic + "defaultProfile.png"
            }
            alt="ProfileImage"
          />
        )}
      </div>
      <div className="ProfileName">
        <span>
          {user._id === profileUserId
            ? profileUser?.username
            : profileUser?.data?.username}
        </span>
        <span>
          {user._id === profileUserId
            ? profileUser?.worksAt
            : profileUser?.data?.worksAt}
        </span>

        <div className="followstatus">
          <hr />
          <div>
            <div className="follow">
              <span>
                {user._id === profileUserId
                  ? profileUser?.following?.length
                  : profileUser?.data?.following.length}
              </span>
              <span>following</span>
            </div>
            <div className="vl"></div>
            <div className="follow">
              <span>
                {user._id === profileUserId
                  ? profileUser?.followers?.length
                  : profileUser?.data?.followers.length}
              </span>
              <span>followers</span>
            </div>
            {location === "profilePage" && (
              <>
                <div className="vl"></div>
                <div className="follow">
                  <span>
                    {posts.filter((post) => post.userId === user._id).length}
                  </span>
                  <span>Posts</span>
                </div>
              </>
            )}
          </div>
          <hr />
        </div>
      </div>
      {location === "profilePage" ? (
        ""
      ) : (
        <span>
          <Link
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
            to={`/profile/${user._id}`}
          >
            My Profile
          </Link>
        </span>
      )}
    </div>
  );
};

export default ProfileCard;
