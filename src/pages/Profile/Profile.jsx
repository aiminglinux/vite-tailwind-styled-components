import tw, { styled } from "twin.macro";
import { MdLocationPin } from "react-icons/md";
import { FaBirthdayCake } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectCurrentUser } from "../../core/features/auth/authSlice";

import Button from "../../components/Button/Button";
import RouteWrapper from "../../components/RouteWrapper/RouteWrapper";

const Profile = () => {
  const currentUser = useSelector(selectCurrentUser);
  return (
    <RouteWrapper>
      <Wrapper>
        <Header>
          <Content>
            <div className="-mt-16">
              <span className="w-28 h-28 mx-auto items-center flex">
                <img
                  className="w-32 rounded-full border-4 border-solid"
                  src="http://res.cloudinary.com/drkdy5tsq/image/upload/v1665634943/Profiles/ep8km7ckf3donawg7jze.jpg"
                  alt=""
                />
              </span>
              <div className="flex items-center justify-end space-x-2 -mt-8 px-4">
                <Link to="/settings">
                  <Button hasBg>Edit Profile</Button>
                </Link>
                {/* <div className="p-2 hover:bg-gray-200 hover:rounded-md">
                  <BsThreeDots size={24} />
                </div> */}
              </div>
            </div>
            <div className="p-4 text-center space-y-4">
              <h1 className="text-4xl font-semibold">{currentUser.name}</h1>
              {currentUser.bio ? (
                <p>{currentUser.bio}</p>
              ) : (
                <p>404 bio not found</p>
              )}
              <div className="flex space-x-4 items-center mx-auto justify-center text-gray-400">
                {currentUser.location && (
                  <span className="flex space-x-1 items-center">
                    <MdLocationPin />
                    <span>Bucharest, Romania</span>
                  </span>
                )}
                <span className="flex space-x-1 items-center">
                  <FaBirthdayCake />
                  <span>Joined on Apr 7, 2021</span>
                </span>
              </div>
            </div>
            <div className="flex justify-center border-t p-4">
              <div className="text-center">
                <strong className="space-y-2">
                  <p className="text-xs text-gray-400">Work</p>
                  <p className="text-lg font-normal">
                    Founder & UI/UX Designer at Simmmple
                  </p>
                </strong>
              </div>
            </div>
          </Content>
        </Header>
      </Wrapper>
    </RouteWrapper>
  );
};

const Wrapper = tw.div`mt-14 grid grid-cols-[1fr] w-full`;
const Header = tw.div`mx-auto w-full max-w-[1024px] bg-white items-center rounded-md border border-solid`;
const Content = tw.div`relative`;

export default Profile;
