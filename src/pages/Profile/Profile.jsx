import tw, { styled } from "twin.macro";
import { MdLocationPin } from "react-icons/md";
import { FaBirthdayCake } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineFileText, AiOutlineComment } from "react-icons/ai";
import { HiOutlineHashtag } from "react-icons/hi";

import { selectCurrentUser } from "../../core/features/auth/authSlice";

import Button from "../../components/Button/Button";
import RouteWrapper from "../../components/RouteWrapper/RouteWrapper";
import { formatDate } from "../../utils/string";
import PostList from "../../components/PostList/PostList";
import Post from "../../components/PostList/components/Post";

const Profile = () => {
  const currentUser = useSelector(selectCurrentUser);
  return (
    <RouteWrapper>
      <Wrapper>
        <Header>
          <HeaderContent>
            <div className="mt-4 md:-mt-16">
              <span className="w-28 h-28 mx-auto items-center flex">
                <img
                  className="w-32 rounded-full border-4 border-solid"
                  src={currentUser.picture?.url}
                  alt={currentUser.name}
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
                <p className="w-[70%] mx-auto">{currentUser.bio}</p>
              ) : (
                <p>404 bio not found</p>
              )}
              <div className="flex space-x-4 items-center mx-auto justify-center text-gray-600">
                {currentUser.location && (
                  <span className="flex space-x-1 items-center">
                    <MdLocationPin />
                    <span>{currentUser.location}</span>
                  </span>
                )}
                <span className="flex space-x-1 items-center">
                  <FaBirthdayCake />
                  <span>
                    Joined on {formatDate(currentUser.createdAt, false)}
                  </span>
                </span>
              </div>
            </div>
            <div className="flex justify-evenly border-t p-4">
              <div className="text-center">
                <strong className="space-y-2">
                  <p className="text-xs text-gray-600">Work</p>
                  <p className="text-lg font-normal">{currentUser.workingAt}</p>
                </strong>
              </div>
              <div className="text-center">
                <strong className="space-y-2">
                  <p className="text-xs text-gray-600">Education</p>
                  <p className="text-lg font-normal">{currentUser.education}</p>
                </strong>
              </div>
            </div>
          </HeaderContent>
        </Header>
        <div className="grid grid-cols-[0.5fr_1fr] gap-4 mx-auto w-full">
          <aside className="space-y-4">
            <div className="bg-white rounded-md">
              <div className="border-b p-4">
                <h3 className="font-semibold">Skills/Languages</h3>
              </div>
              <div className="p-4">
                <p className="text-gray-600">{currentUser.skills}</p>
              </div>
            </div>
            <div className="bg-white rounded-md">
              <div className="border-b p-4">
                <h3 className="font-semibold">Currently working on</h3>
              </div>
              <div className="p-4">
                <p className="text-gray-600">{currentUser.workingOn}</p>
              </div>
            </div>
            <div className="bg-white rounded-md">
              <div className="border-b p-4">
                <h3 className="font-semibold">Available for</h3>
              </div>
              <div className="p-4">
                <p className="text-gray-600">{currentUser.availableFor}</p>
              </div>
            </div>
            <div className="bg-white rounded-md space-y-4 p-4">
              <div className="flex space-x-2 text-gray-600">
                <AiOutlineFileText size={24} />
                <span>1248 posts published</span>
              </div>
              <div className="flex space-x-2 text-gray-600">
                <AiOutlineComment size={24} />
                <span>9135 comments written</span>
              </div>
              <div className="flex space-x-2 text-gray-600">
                <HiOutlineHashtag size={24} />
                <span>62 tags followed</span>
              </div>
            </div>
          </aside>
          <div className="space-y-4">
            <PostList>
              <Post />
            </PostList>
            <div className="bg-white rounded-md">
              <div className="text-gray-600 p-6 text-xl font-semibold border-b">
                <h3>Recent comments</h3>
              </div>
              <div className="px-6 py-2 border-b hover:bg-gray-200">
                <Link to="#!">
                  <h4 className="text-md font-semibold text-gray-600">
                    What's on your mind?
                  </h4>
                  <div className="flex space-x-2">
                    <p className="text-sm text-gray-600">
                      Lorem ipsum dolor sit amet, consectetur ...
                    </p>
                    <p className="text-sm text-gray-600">
                      <small>Nov 1</small>
                    </p>
                  </div>
                </Link>
              </div>
              <div className="px-6 py-2 border-b hover:bg-gray-200">
                <Link to="#!">
                  <h4 className="text-md font-semibold text-gray-600">
                    What's on your mind?
                  </h4>
                  <div className="flex space-x-2">
                    <p className="text-sm text-gray-600">
                      Lorem ipsum dolor sit amet, consectetur ...
                    </p>
                    <p className="text-sm text-gray-600">
                      <small>Nov 11</small>
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </RouteWrapper>
  );
};

const Wrapper = tw.div`max-w-[1024px] mx-auto mt-14 grid grid-cols-[1fr] w-full space-y-4`;
const Header = tw.div`w-full bg-white items-center rounded-md border border-solid`;
const HeaderContent = tw.div`relative`;

export default Profile;
