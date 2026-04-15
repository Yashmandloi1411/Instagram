import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Feed from "./features/post/pages/Feed";
import CreatePost from "./features/post/pages/CreatePost";
import ProfileDetails from "./features/shared/components/ProfileDetails";

function RoutesComponent() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/profile-details" element={<ProfileDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesComponent;

// import { createBrowserRouter } from "react-router-dom";
// import Login from "./features/auth/pages/Login";
// import Register from "./features/auth/pages/Register";

// export const routes = createBrowserRouter([
//   {
//     path: "/login",
//     element: <Login />,
//   },
//   {
//     path: "/register",
//     element: <Register />,
//   },
// ]);
