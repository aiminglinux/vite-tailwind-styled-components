import AuthorDetail from "./components/AuthorDetail";
import PostContent from "./components/PostContain";
import Reactions from "./components/Reactions";

const PostDetail = () => {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-[64px_1fr] lg:grid-cols-[64px_1fr_350px] mx-auto">
      <aside className="hidden md:block">
        <Reactions />
      </aside>
      <main>
        <PostContent />
      </main>
      <aside className="hidden lg:block">
        <AuthorDetail />
      </aside>
    </div>
  );
};

export default PostDetail;
