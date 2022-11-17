import { formatDate } from "../../../utils/string";
import ContentMarkdown from "../../../components/ContentMarkdown/ContentMarkdown";

const PostContent = ({ post }) => {
  return (
    <div className="border bg-white rounded-md border-solid">
      <img
        src={post?.image?.url}
        alt={post.title}
        className="md:rounded-t-md w-full h-96 "
      />
      <div>
        <div className="p-4 md:px-12 md:py-8 space-y-4">
          <div className="flex gap-2">
            <img
              src={post.author.picture?.url}
              alt={post.author.username}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h4 className="text-md font-semibold">{post.author.name}</h4>
              <p className="text-sm text-gray-500">
                {formatDate(post.createdAt)}
                {formatDate(post.createdAt) !== formatDate(post.updatedAt) && (
                  <span>{`Updated ${formatDate(post.updatedAt)}`}</span>
                )}
              </p>
            </div>
          </div>

          <h1 className="text-5xl font-semibold">
            Highest Paying Jobs for Developer
          </h1>
          <div className="space-x-2">
            <a href="#!">#startup</a>
            <a href="#!">#productivity</a>
            <a href="#!">#career</a>
            <a href="#!">#news</a>
          </div>
          <div>
            <ContentMarkdown children={post.body} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostContent;
