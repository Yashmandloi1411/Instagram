// import React from "react";
// import Post from "../components/Post";

// import usePost from "../hooks/usePost";
// import Nav from "../../shared/components/Nav";
// import "../style/feed.scss";

// function Feed() {
//   return (
//     <main className="feed-page">
//       <div className="feed">
//         <div className="posts ">
//           <Nav />
//           <Post />
//         </div>
//       </div>
//     </main>
//   );
// }

// export default Feed;
import React from "react";
import Post from "../components/Post";
import Nav from "../../shared/components/Nav";
import "../style/feed.scss";

function Feed() {
  return (
    <main className="feed-page">
      <div className="feed">
        <Nav />

        <div className="posts">
          <Post />
        </div>

        <div></div>
      </div>
    </main>
  );
}

export default Feed;
