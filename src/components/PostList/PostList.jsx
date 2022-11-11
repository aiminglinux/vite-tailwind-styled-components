import Skeleton from "../Skeleton/Skeleton";
import Post from "./components/Post";

function PostList() {
  let isLoading = true;
  return (
    <div className="flex flex-col space-y-4">
      {/* <div>{isLoading && <Skeleton />}</div> */}
      <Post />
      <Post />
    </div>
  );
}

export default PostList;
