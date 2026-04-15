import React, { useState, useRef } from "react";
import "../style/createpost.scss";

import usePost from "../hooks/usePost";
import { useNavigate } from "react-router-dom";
function CreatePost() {
  const navigate = useNavigate();
  const { loading, handleCreatePost } = usePost();
  const [caption, setCaption] = useState("");

  const postImageInputFieldRef = useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault();

    // input field ko reference derakha ha (ref) isma se file niklao
    const file = postImageInputFieldRef.current.files[0];

    handleCreatePost({ file, caption });
    navigate("/feed");
  };
  return (
    // <div>
    //   <h1>Create Post</h1>
    //   <form onSubmit={handleSubmit}>
    //     <input
    //       value={caption}
    //       onChange={(e) => setCaption(e.target.value)}
    //       type="text"
    //       name="caption"
    //       id="caption"
    //       placeholder="Enter caption for post"
    //     />
    //     <label className="post-image-label" htmlFor="postImage">
    //       select Image
    //     </label>
    //     <input
    //       ref={postImageInputFieldRef}
    //       hidden
    //       type="file"
    //       name="postImage"
    //       id="postImage"
    //     />
    //     <button className="button primary-button">create Post</button>
    //   </form>
    // </div>
    <div className="create-post-container">
      <div className="create-post-card">
        <h2>Create new post</h2>

        <form onSubmit={handleSubmit}>
          <input
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            type="text"
            placeholder="Write a caption..."
            className="caption-input"
          />

          <label className="post-image-label" htmlFor="postImage">
            📷 Select Image
          </label>

          <input
            ref={postImageInputFieldRef}
            hidden
            type="file"
            id="postImage"
          />

          <button className="submit-btn">
            {loading ? "Posting..." : "Share"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
