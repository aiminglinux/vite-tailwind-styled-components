import { Route, Routes } from "react-router-dom";
import RequireAuthen from "../components/RequireAuthen/RequireAuthen";
import DefaultLayout from "../Layouts/DefaultLayout/DefaultLayout";
import Home from "../Layouts/Home/Home";
import Confirmation from "../pages/Confirmation/Confirmation";
import CreatePost from "../pages/CreatePost/CreatePost";
import Dashboard from "../pages/Dashboard/Dashboard";
import EditProfile from "../pages/EditProfile/EditProfile";
import Login from "../pages/Login/Login";
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
        </Route>
        <Route path="auth">
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="confirm/:confirmType" element={<Confirmation />} />
        </Route>
        <Route path="profile" element={<Profile />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="reading-list" element={<ReadingList />} />
        <Route path="edit-profile" element={<EditProfile />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
