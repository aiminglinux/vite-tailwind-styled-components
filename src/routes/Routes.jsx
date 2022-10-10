import { Route, Routes } from "react-router-dom";
import DefaultLayout from "../Layouts/DefaultLayout/DefaultLayout";
import Home from "../Layouts/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
