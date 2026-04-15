// import React from "react";

// import "../nav.scss";
// import { useNavigate } from "react-router-dom";

// function Nav() {
//   const navigate = useNavigate();
//   return (
//     <nav className="nav-bar">
//       <div className="logo" onClick={() => navigate("/feed")}>
//         Instagram
//       </div>

//       <div className="nav-actions">
//         <button onClick={() => navigate("/create-post")} className="create-btn">
//           <i className="ri-add-line"></i>
//         </button>
//       </div>
//     </nav>
//   );
// }

// export default Nav;

import React from "react";

import "../nav.scss";
import { useNavigate } from "react-router-dom";
import useAuth from "../../auth/hooks/useAuth"; // path adjust karo
function Nav() {
  const navigate = useNavigate();

  const { user } = useAuth();
  console.log("user navme", user);
  return (
    <nav className="nav-bar">
      <div className="nav-actions">
        <div>Home</div>
        <button onClick={() => navigate("/create-post")} className="create-btn">
          <i className="ri-add-line"></i>
        </button>

        <button onClick={() => navigate("/profile-details")}>
          <img
            src={user.data.user.profile_Image}
            alt="profile"
            onClick={() => navigate("/profile-details")}
            className="nav-profile"
          />
        </button>
      </div>
    </nav>
  );
}

export default Nav;
