import { ProfileContext } from "../profile.context";

import { useContext } from "react";

function useProfile() {
  const context = useContext(ProfileContext);

  return context;
}

export default useProfile;
