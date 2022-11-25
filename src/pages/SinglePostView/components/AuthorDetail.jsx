import { useNavigate } from "react-router-dom";

import Button from "../../../components/Button/Button";
import { formatDate } from "../../../utils/string";

const AuthorDetail = ({ author }) => {
  const navigate = useNavigate();
  // console.log("Author detail");
  return (
    <div className="grid gap-4">
      <div className="grid gap-4 p-4 border rounded-md bg-slate-50	 border-t-[2rem] border-t-gray-300">
        <div className="-mt-8">
          <div className="flex items-end space-x-2">
            <span className="border border-gray-600 rounded-full">
              <img
                src={author.picture?.url}
                alt="author.username"
                className="w-12 h-12 rounded-full"
              />
            </span>
            <span
              className="text-xl font-medium hover:text-blue-600 cursor-pointer"
              onClick={() => navigate(`/${author?.username}`)}
            >
              {author.name}
            </span>
          </div>
        </div>
        <div>
          <Button hasBg isFull>
            Follow
          </Button>
        </div>
        <p className="text-gray-600">{author.bio}</p>
        <div className="">
          <ul className="text-gray-700 grid gap-4">
            {author.location && (
              <li>
                <p className="text-sm font-medium">LOCATION</p>
                <p>{author.location}</p>
              </li>
            )}
            {author.education && (
              <li>
                <p className="text-sm font-medium">EDUCATION</p>
                <p>{author.education}</p>
              </li>
            )}
            {author.workingOn && (
              <li>
                <p className="text-sm font-medium">NOW BUSY ON</p>
                <p>{author.workingOn}</p>
              </li>
            )}
            <li>
              <p className="text-sm font-medium">JOINED</p>
              <p>{formatDate(author.createdAt, false)}</p>
            </li>
          </ul>
        </div>
      </div>
      {/* {more && (
        <div>
          <div className="bg-slate-50	 rounded-md border">
            <div className="border-b p-4">
              <h3 className="font-semibold text-xl">
                More from{" "}
                <span
                  className="text-blue-600 hover:cursor-pointer"
                  onClick={() => navigate(`/${author?.username}`)}
                >
                  {author.name}
                </span>
              </h3>
            </div>
            {postsByUser.posts.map((post) => (
              <div
                key={post.id}
                className="p-4 border-b hover:bg-white cursor-pointer"
                onClick={() =>
                  navigate(`/${post.author.username}/${post.slug}`)
                }
              >
                <p className="text-gray-600 hover:text-blue-500">
                  {post.title}
                </p>
                <p className="text-sm text-gray-500">#endregion</p>
              </div>
            ))}
          </div>
        </div>
      )} */}
    </div>
  );
};

export default AuthorDetail;
