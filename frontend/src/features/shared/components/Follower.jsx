import React from "react";
import { followers } from "../hooks/useProfile";
function Follower() {
  return (
    <div>
      <div>{profile_Image}</div>
      <h1>{username}</h1>
    </div>
  );
}

export default Follower;
