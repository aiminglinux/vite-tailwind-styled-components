import { Route, Routes } from "react-router-dom";
import DefaultLayout from "../Layouts/DefaultLayout/DefaultLayout";
import Home from "../Layouts/Home/Home";
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
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="profile" element={<Profile />} />
        <Route path="create-post" element={<CreatePost />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="reading-list" element={<ReadingList />} />
        <Route path="edit-profile" element={<EditProfile />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
