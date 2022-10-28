import { AiOutlineProfile, AiOutlineAccountBook } from "react-icons/ai";
import { Link, NavLink, Outlet } from "react-router-dom";

const EditProfile = () => {
  return (
    <div className="max-w-[1024px] mx-auto grid gap-4 grid-cols-[240px_1fr]">
      <div className="col-span-2">
        <h1 className="text-3xl font-semibold">
          Settings for <span className="text-blue-600">@aiminglinux</span>
        </h1>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink
              end
              to=""
              className={({ isActive }) =>
                isActive
                  ? "flex space-x-2 p-2 bg-white rounded-md"
                  : "flex space-x-2 p-2 hover:bg-blue-200 hover:rounded-md"
              }
            >
              <AiOutlineProfile size={24} />
              <span>Profile</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="user-account"
              className={({ isActive }) =>
                isActive
                  ? "flex space-x-2 p-2 bg-white rounded-md"
                  : "flex space-x-2 p-2 hover:bg-blue-200 hover:rounded-md"
              }
            >
              <AiOutlineAccountBook size={24} />
              <span>Account</span>
            </NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

export default EditProfile;
