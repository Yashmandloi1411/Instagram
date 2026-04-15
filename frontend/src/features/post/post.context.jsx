import { createContext, useState } from "react";
import { getAllFeeds } from "./services/feed.service";
import { createPost, likePost, unlikePost } from "./services/feed.service";
export const PostContext = createContext();

function PostProvider({ children }) {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [feed, setFeed] = useState(null);

  const getPostHandle = async () => {
    setLoading(true);
    try {
      const response = await getAllFeeds();
      console.log("response", response);
      setPosts(response.data.posts);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async (file, caption) => {
    setLoading(true);
    try {
      const data = await createPost(file, caption);
      // setPosts([data.post, ...feed]);
      setPosts((prev) => [data.post, ...(prev || [])]);
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLikePost = async (post) => {
    setLoading(true);

    const data = await likePost(post);
    await getPostHandle();
    setLoading(false);
  };

  const handleUnLikePost = async (post) => {
    setLoading(true);

    const data = await unlikePost(post);
    await getPostHandle();
    setLoading(false);
  };
  return (
    <PostContext.Provider
      value={{
        getPostHandle,
        posts,
        setPosts,
        loading,
        setLoading,
        feed,
        setFeed,
        handleCreatePost,
        handleLikePost,
        handleUnLikePost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

export default PostProvider;
