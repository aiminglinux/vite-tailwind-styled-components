import { Route, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

// Components
import NotFound from "../components/NotFound/NotFound";
import RequireAuthen from "../components/RequireAuthen/RequireAuthen";
import DefaultLayout from "../Layouts/DefaultLayout/DefaultLayout";
import Home from "../Layouts/Home/Home";
import Confirmation from "../pages/Confirmation/Confirmation";
import CreatePost from "../pages/PostEditor/PostEditor";
import Dashboard from "../pages/Dashboard/Dashboard";
import UserAccount from "../pages/EditProfile/components/UserAccount";
import UserProfile from "../pages/EditProfile/components/UserProfile";
import EditProfile from "../pages/EditProfile/EditProfile";
import Login from "../pages/Login/Login";
import Profile from "../pages/Profile/Profile";
import ReadingList from "../pages/ReadingList/ReadingList";
import PostContainer from "../pages/SinglePostView/PostContainer";
import Register from "../pages/Register/Register";
import EditPost from "../pages/EditPost/EditPost";

const AppRoutes = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [location]);

  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<Home />} />
        <Route element={<RequireAuthen />}>
          <Route path="create-post" element={<CreatePost />} />
          <Route path="settings" element={<EditProfile />}>
            <Route index element={<UserProfile />} />
            <Route path="user-profile" element={<UserProfile />} />
            <Route path="user-account" element={<UserAccount />} />
          </Route>
        </Route>
        <Route path="users/:userId">
          <Route index element={<Profile />} />
          <Route path="*" element={<NotFound />} />
          <Route path=":postSlug">
            <Route index element={<PostContainer />} />
            <Route element={<RequireAuthen />}>
              <Route path="edit" element={<CreatePost />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
        <Route path="posts/:postId">
          <Route index element={<PostContainer />} />
          <Route element={<RequireAuthen />}>
            <Route path="edit" element={<CreatePost />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="auth">
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="reading-list" element={<ReadingList />} />
        <Route path="settings" element={<EditProfile />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
