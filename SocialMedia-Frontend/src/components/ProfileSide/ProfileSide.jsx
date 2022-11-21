import React from "react";
import FollowersCard from "../FollowersCard/FollowersCard";
import LogoSearch from "../LogoSearch/LogoSearch";
import ProfileCard from "../ProfileCard/ProfileCard";
import "./ProfileSide.css";
const Profile = () => {
  return (
    <div className="ProfileSide">
      <LogoSearch />
      <ProfileCard location="homePage" />
    </div>
  );
};

export default Profile;
