import { createContext, useState } from "react";

import {
  getAllFollowerList,
  getAllFollowingList,
} from "./services/profile.service";

export const ProfileContext = createContext();

function ProfileProvide({ children }) {
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(false);

  // 👉 GET FOLLOWERS
  const handleFollower = async (username) => {
    setLoading(true);
    try {
      const response = await getAllFollowerList(username);
      setFollowers(response.followers || []);
    } catch (error) {
      console.log("error in followers", error);
    } finally {
      setLoading(false);
    }
  };

  // 👉 GET FOLLOWING
  const handleFollowing = async (username) => {
    setLoading(true);
    try {
      const response = await getAllFollowingList(username);
      setFollowing(response.following || []);
    } catch (error) {
      console.log("error in following", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        followers,
        following,
        loading,
        handleFollower,
        handleFollowing,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export default ProfileProvide;
