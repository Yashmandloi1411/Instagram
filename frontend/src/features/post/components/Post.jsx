import React, { useEffect } from "react";
import "../style/feed.scss";
import usePost from "../hooks/usePost";

function Post() {
  const { getPostHandle, posts, loading, handleLikePost, handleUnLikePost } =
    usePost();

  useEffect(() => {
    getPostHandle();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {posts?.map((post) => (
        <div className="post" key={post._id}>
          <div className="user">
            <div className="img-wrapper">
              <img
                src="https://images.unsplash.com/photo-1546961329-78bef0414d7c"
                alt=""
              />
            </div>
            <p>{post?.user?.username || "No User"}</p>
          </div>

          <img src={post.imgUrl} alt="" />

          <div className="icons">
            <div className="left">
              <i
                className={`${
                  post.isLiked ? "ri-heart-fill like" : "ri-heart-line"
                }`}
                onClick={() => {
                  post.isLiked
                    ? handleUnLikePost(post._id)
                    : handleLikePost(post._id);
                }}
              ></i>
              <i className="ri-chat-3-line"></i>
              <i className="ri-send-plane-line"></i>
            </div>

            <div className="right">
              <i className="ri-bookmark-line"></i>
            </div>
          </div>

          <div className="bottom">
            <p>{post.caption}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Post;
