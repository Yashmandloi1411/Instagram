import { PostContext } from "../post.context";

import { useContext } from "react";

function usePost() {
  const context = useContext(PostContext);

  return context;
}

export default usePost;
