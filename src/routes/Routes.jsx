import { Route, Routes } from "react-router-dom";

// Components
import NotFound from "../components/NotFound/NotFound";
import RequireAuthen from "../components/RequireAuthen/RequireAuthen";
import DefaultLayout from "../Layouts/DefaultLayout/DefaultLayout";
import Home from "../Layouts/Home/Home";
import Confirmation from "../pages/Confirmation/Confirmation";
import CreatePost from "../pages/CreatePost/CreatePost";
import Dashboard from "../pages/Dashboard/Dashboard";
import UserAccount from "../pages/EditProfile/components/UserAccount";
import UserProfile from "../pages/EditProfile/components/UserProfile";
import EditProfile from "../pages/EditProfile/EditProfile";
import Login from "../pages/Login/Login";
import PostDetail from "../pages/PostDetail/PostDetail";
import Profile from "../pages/Profile/Profile";
import ReadingList from "../pages/ReadingList/ReadingList";
import Register from "../pages/Register/Register";

function AppRoutes() {
  return (
    <Routes>
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
        <Route path=":username">
          <Route index element={<Profile />} />
          <Route path="*" element={<NotFound />} />

          <Route path=":postUrl">
            <Route index element={<PostDetail />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          {/* <Route path=":postSlug">
            <Route index element={<PostDetail />} />
            <Route path="*" element={<NotFound />} />
          </Route> */}
        </Route>
        <Route path="auth">
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="confirm/:confirmType" element={<Confirmation />} />
        </Route>
        {/* <Route path="profile" element={<Profile />} /> */}
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="reading-list" element={<ReadingList />} />
        <Route path="settings" element={<EditProfile />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
