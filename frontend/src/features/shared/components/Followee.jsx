import React from "react";

import { following } from "../hooks/useProfile";
function Followee() {
  return (
    <div>
      <div>{profile_Image}</div>
      <h1>{username}</h1>
    </div>
  );
}

export default Followee;
