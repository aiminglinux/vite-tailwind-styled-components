import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

import CodeBlock from "./components/CodeBlock";

const ContentMarkdown = (props) => {
  return (
    <article className="prose max-w-none">
      <ReactMarkdown
        components={CodeBlock}
        rehypePlugins={[rehypeRaw]}
        remarkPlugins={[gfm]}
        {...props}
      />
    </article>
  );
};

export default ContentMarkdown;
