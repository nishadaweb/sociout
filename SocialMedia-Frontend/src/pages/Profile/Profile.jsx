import React from "react";
import "./Profile.css";
import ProfilePageCard from "../../components/ProfilePageCard/ProfilePageCard";
import PostSide from "../../components/PostSide/PostSide";
import ProfileLeft from "../../components/ProfileLeft/ProfileLeft";
import RightSide from "../../components/RightSide/RightSide";
import Navigation from "../../components/Navigation/Navigation";
import Posts from "../../components/Posts/Posts";
const Profile = () => {
  return (
    <div className="Profile">
      <ProfileLeft />
      <div className="Profile-center">
        <ProfilePageCard location="profilePage" />
        <div className="Postside">
          <Navigation />
          <Posts />
        </div>
      </div>
      <RightSide />
    </div>
  );
};

export default Profile;
