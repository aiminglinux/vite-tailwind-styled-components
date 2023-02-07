import tw, { styled } from "twin.macro";
import { MdLocationPin } from "react-icons/md";
import { FaBirthdayCake } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineFileText, AiOutlineComment } from "react-icons/ai";
import { HiOutlineHashtag } from "react-icons/hi";

import { selectCurrentUser } from "../../core/features/auth/authSlice";
import { useGetUserQuery } from "../../core/features/users/usersApiSlice";

import Button from "../../components/Button/Button";
import RouteWrapper from "../../components/RouteWrapper/RouteWrapper";
import { formatDate } from "../../utils/string";
import PostList from "../../components/PostList/PostList";
import Post from "../../components/PostList/components/Post";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import NotFound from "../../components/NotFound/NotFound";

const Profile = () => {
  const currentUser = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const { userId } = useParams();
  console.log(userId);
  const { data: previewUser, isLoading } = useGetUserQuery(userId, {
    refetchOnMountOrArgChange: true,
  });

  // return console.log(previewUser);
  return (
    <RouteWrapper>
      {isLoading ? (
        <LoadingSpinner />
      ) : previewUser ? (
        <Wrapper>
          <Header>
            <HeaderContent>
              <div className="mt-4 md:-mt-16">
                <span className="w-28 h-28 mx-auto items-center flex">
                  <img
                    className="w-32 rounded-full border-4 border-solid"
                    src={previewUser.picture?.url}
                    alt={previewUser.name}
                  />
                </span>
                <div className="flex items-center justify-end space-x-2 -mt-8 px-4">
                  {previewUser.username === currentUser.username ? (
                    <Link to="/settings">
                      <Button hasBg>Edit Profile</Button>
                    </Link>
                  ) : (
                    <Link to="/settings">
                      <Button hasBg>Follow</Button>
                    </Link>
                  )}

                  {/* <div className="p-2 hover:bg-gray-200 hover:rounded-md">
                  <BsThreeDots size={24} />
                </div> */}
                </div>
              </div>
              <div className="p-4 text-center space-y-4">
                <h1 className="text-4xl font-semibold">{previewUser.name}</h1>
                {previewUser.bio ? (
                  <p className="w-[70%] mx-auto">{previewUser.bio}</p>
                ) : (
                  <p>404 bio not found</p>
                )}
                <div className="flex space-x-4 items-center mx-auto justify-center text-gray-600">
                  {previewUser.location && (
                    <span className="flex space-x-1 items-center">
                      <MdLocationPin />
                      <span>{previewUser.location}</span>
                    </span>
                  )}
                  <span className="flex space-x-1 items-center">
                    <FaBirthdayCake />
                    <span>
                      Joined on {formatDate(previewUser.createdAt, false)}
                    </span>
                  </span>
                </div>
              </div>
              <div className="flex justify-evenly border-t p-4">
                <div className="text-center">
                  <strong className="space-y-2">
                    <p className="text-xs text-gray-600">Work</p>
                    <p className="text-lg font-normal">
                      {previewUser.workingAt}
                    </p>
                  </strong>
                </div>
                <div className="text-center">
                  <strong className="space-y-2">
                    <p className="text-xs text-gray-600">Education</p>
                    <p className="text-lg font-normal">
                      {previewUser.education}
                    </p>
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
                  <p className="text-gray-600">{previewUser.skills}</p>
                </div>
              </div>
              <div className="bg-white rounded-md">
                <div className="border-b p-4">
                  <h3 className="font-semibold">Currently working on</h3>
                </div>
                <div className="p-4">
                  <p className="text-gray-600">{previewUser.workingOn}</p>
                </div>
              </div>
              <div className="bg-white rounded-md">
                <div className="border-b p-4">
                  <h3 className="font-semibold">Available for</h3>
                </div>
                <div className="p-4">
                  <p className="text-gray-600">{previewUser.availableFor}</p>
                </div>
              </div>
              <div className="bg-white rounded-md space-y-4 p-4">
                <div className="flex space-x-2 text-gray-600">
                  <AiOutlineFileText size={24} />
                  <span>{previewUser.posts.length} posts published</span>
                </div>
                <div className="flex space-x-2 text-gray-600">
                  <AiOutlineComment size={24} />
                  <span>{previewUser.comments.length} comments written</span>
                </div>
                <div className="flex space-x-2 text-gray-600">
                  <HiOutlineHashtag size={24} />
                  <span>{previewUser.followedTags.length} tags followed</span>
                </div>
              </div>
            </aside>
            <div className="space-y-4">
              <PostList posts={previewUser.posts} />
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
      ) : (
        <NotFound />
      )}
    </RouteWrapper>
  );
};

const Wrapper = tw.div`max-w-[1024px] mx-auto mt-14 grid grid-cols-[1fr] w-full space-y-4`;
const Header = tw.div`w-full bg-white items-center rounded-md border border-solid`;
const HeaderContent = tw.div`relative`;

export default Profile;
