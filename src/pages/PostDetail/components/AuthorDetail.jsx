import { Link } from "react-router-dom";

import { formatDate } from "../../../utils/string";
import Button from "../../../components/Button/Button";

const AuthorDetail = ({ author }) => {
  return (
    <div className="grid gap-4">
      <div className="grid gap-4 p-4 border rounded-md bg-slate-50	 border-t-[2rem] border-t-gray-300">
        <div className="-mt-8">
          <Link to="#!" className="flex items-end space-x-2">
            <span className="border border-gray-600 rounded-full">
              <img
                src={author.picture?.url}
                alt="author.username"
                className="w-12 h-12 rounded-full"
              />
            </span>
            <span className="text-xl font-medium">{author.name}</span>
          </Link>
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
      <div>
        <div className="bg-slate-50	 rounded-md border">
          <div className="border-b p-4">
            <h3 className="font-semibold text-xl">
              More from{" "}
              <span className="text-blue-600 hover:cursor-pointer">
                {author.name}
              </span>
            </h3>
          </div>
          <div className="p-4 border-b">
            <p className="text-gray-600">
              How to use JavaScript Ternary Operator?
            </p>
            <p className="text-sm text-gray-500">#endregion</p>
          </div>
          <div className="p-4 border-b">
            <p className="text-gray-600">
              How to use JavaScript Ternary Operator?
            </p>
            <p className="text-sm text-gray-500">
              #javascript #webdev #programming #opensource
            </p>
          </div>
          <div className="p-4">
            <p className="text-gray-600">
              How to use JavaScript Ternary Operator?
            </p>
            <p className="text-sm text-gray-500">#javascript #webdev</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorDetail;
