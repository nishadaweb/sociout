import React from "react";
import FollowersCard from "../../components/FollowersCard/FollowersCard";
import Navigation from "../../components/Navigation/Navigation";

function Followers() {
  return (
    <div className="RightSide">
      <Navigation />
      <FollowersCard />
    </div>
  );
}

export default Followers;
