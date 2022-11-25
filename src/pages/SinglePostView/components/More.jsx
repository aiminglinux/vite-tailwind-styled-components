import { useNavigate } from "react-router-dom";

const More = ({ author }) => {
  const navigate = useNavigate();
  //   console.log("More");
  return (
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
        {author.posts.map((post) => (
          <div
            key={post.id}
            className="p-4 border-b hover:bg-white cursor-pointer"
            onClick={() => navigate(`/${post.author.username}/${post.slug}`)}
          >
            <p className="text-gray-600 hover:text-blue-500">{post.title}</p>
            <p className="text-sm text-gray-500">#endregion</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default More;
