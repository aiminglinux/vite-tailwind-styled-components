import moment from "moment/moment";
import tw from "twin.macro";
import { useNavigate } from "react-router-dom";

import {
  formatDate,
  createPostUrl,
  createPostSlug,
} from "../../../utils/string";

const Post = ({ post }) => {
  const navigate = useNavigate();
  // console.log("Post Slug: ", createPostSlug(post.title));
  return (
    <Wrapper>
      <Content>
        <Header onClick={() => navigate(`/${post.author?.username}`)}>
          <AuthorImg src={post.author.picture.url} alt={post.author.username} />
          <AuthorMeta>
            <AuthorName>{post.author.name}</AuthorName>
            <CreateAt>
              {formatDate(post.createdAt)}
              {formatDate(post.createdAt) !== formatDate(post.updatedAt) && (
                <UpdateAt>{` Updated ${formatDate(post.updatedAt)}`}</UpdateAt>
              )}
            </CreateAt>
          </AuthorMeta>
        </Header>
        <Title
          onClick={() =>
            navigate(
              `/${post.author.username}/${createPostUrl(post.title, post.id)}`
            )
          }
        >
          {post.title}
        </Title>
        <TagList>
          <Tag>#career</Tag>
          <Tag href="#!">
            <span>#</span>programming
          </Tag>
        </TagList>

        <Footer>
          <Reactions>
            <div className="flex justify-between items-center gap-2 text-black-200 rounded-md px-2 py-1 hover:bg-gray-200 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
              <span className="text-base lg:text-sm"> 41 Reactions</span>
            </div>
            <div className="flex justify-between items-center gap-2 text-black-200 rounded-md px-2 py-1 hover:bg-gray-200 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                />
              </svg>
              <span className="text-base lg:text-sm">18 Comments</span>
            </div>
          </Reactions>
          <div className="flex h-full justify-between items-center">
            <small className="m-2">11 min read</small>
            <small className="h-full text-black rounded-md hover:bg-blue-100 hover:text-blue-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 m-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                />
              </svg>
            </small>
          </div>
        </Footer>
      </Content>
    </Wrapper>
  );
};

const Wrapper = tw.div`w-full border border-solid md:rounded-md bg-white`;
const Content = tw.div`p-5`;
const Header = tw.div`flex justify-between items-center w-max gap-4 mb-2`;
const AuthorImg = tw.img`w-12 h-12 rounded-full cursor-pointer`;
const AuthorMeta = tw.div``;
const AuthorName = tw.h4`text-gray-900 rounded-md hover:bg-gray-200 cursor-pointer mb-1`;
const CreateAt = tw.p`text-sm text-gray-500`;
const UpdateAt = tw.span`text-sm text-gray-500`;
const Title = tw.h1`ml-16 text-2xl font-bold mb-2 hover:text-blue-900 cursor-pointer`;
const TagList = tw.div`mb-2 ml-16 flex`;
const Tag = tw.a`h-full gap-4 border-2 border-transparent hover:(border-gray-200 bg-gray-200 rounded-md)`;
const Footer = tw.div`ml-16 flex justify-between items-center`;
const Reactions = tw.div`text-base flex justify-between items-center gap-4`;
export default Post;
