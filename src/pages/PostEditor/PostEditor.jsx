import { yupResolver } from "@hookform/resolvers/yup";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { selectCurrentUser } from "../../core/features/auth/authSlice";
import {
  useCreatePostMutation,
  useGetPostQuery,
  useUpdatePostMutation,
} from "../../core/features/posts/postsApiSlice";

import useBase64 from "../../hooks/useBase64";
import useRequireAuthen from "../../hooks/useRequireAuthen";

import Button from "../../components/Button/Button";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import ContentEditor from "./components/Editor";

const postSchema = yup.object().shape({
  title: yup
    .string()
    .min(5, "Title: Title too short")
    .required("Title: cannot be blank"),
  content: yup
    .string()
    .min(20, "Content: Please lengthen your post at least 20 charactors!")
    .required("Content: cannot be blank"),
});

const PostEditor = () => {
  const { username, postSlug } = useParams();
  const newMode = !postSlug;

  const { data: post } = useGetPostQuery(
    { url: `${username}/${postSlug}` },
    { refetchOnMountOrArgChange: true, skip: newMode }
  );

  const navigate = useNavigate();
  const [file, setFile] = useState(post?.image?.url || undefined);
  const previewURL = useBase64(file);
  const { isAuthed, handleAuth } = useRequireAuthen();
  const currentUser = useSelector(selectCurrentUser);
  const [createNewPost, { isLoading: createLoading, isError }] =
    useCreatePostMutation();
  const [updatePost, { isLoading: patchLoading }] = useUpdatePostMutation();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      content: post?.body || "",
      title: post?.title || "",
      tags: post?.tags.map((tag) => tag.name).join(", ") || "",
      file: previewURL,
    },
    resolver: yupResolver(postSchema),
  });

  const onSubmit = (data) => {
    return newMode ? createPost(data) : patchPost(data);
  };

  const createPost = async (data) => {
    const { title, content, tags } = data;

    console.log(data);
    if (isAuthed) {
      try {
        await createNewPost({
          title,
          body: content,
          file: previewURL,
          tags,
          authorUsername: currentUser.username,
        }).unwrap();
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    } else handleAuth();
  };

  const patchPost = async (data) => {
    const { title, content, tags } = data;
    if (isAuthed) {
      try {
        await updatePost({
          meta: {
            url: `${username}/${postSlug}`,
          },
          patch: {
            title,
            body: content,
            file: previewURL,
            tags,
            authorUsername: username,
            image: {
              url: post.image.url,
              publicId: post.image.publicId,
            },
          },
        });

        navigate("/");
      } catch (error) {
        console.log(error);
      }
    } else handleAuth();
  };

  return (
    <Fragment>
      {createLoading || patchLoading ? (
        <LoadingSpinner />
      ) : (
        <form
          className="border border-solid rounded-md bg-white max-w-screen-lg mx-auto p-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="space-y-4">
            {errors.title && (
              <div className="bg-red-200 rounded-md p-4">
                <h1 className="text-red-400 font-bold text-2xl">
                  Hey, something went wrong:
                </h1>
                <ul className="text-lg">
                  <li>&gt;&gt; {errors.title.message}</li>
                  {errors.content && <li>&gt;&gt; {errors.content.message}</li>}
                </ul>
              </div>
            )}

            <div>
              {!file && (
                <label
                  htmlFor="filePickup"
                  className="border-2 border-solid rounded-md p-2"
                >
                  Add cover image
                </label>
              )}
              <input
                {...register("file")}
                name="file"
                id="filePickup"
                className="hidden"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  setFile(e.target.files[0]), (e.target.value = null);
                }}
              />
              {file && (
                <div className="flex gap-2">
                  <img
                    className="w-32"
                    src={previewURL?.toString()}
                    alt="img"
                  />
                  <div className="flex flex-col justify-center gap-2">
                    <label
                      htmlFor="filePickup"
                      className="border border-solid border-gray-300 rounded-md px-2 py-1 bg-blue-200 text-blue-500"
                      onChange={(e) => {
                        setFile(e.target.file[0]), (e.target.value = null);
                      }}
                    >
                      Change image
                    </label>
                    <div
                      onClick={() => {
                        setFile(undefined);
                      }}
                      className="border border-solid border-gray-300 rounded-md px-2 py-1 text-red-500 bg-red-200"
                    >
                      Remove image
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div>
              <textarea
                className="w-full outline-none resize-none placeholder:text-gray-400 text-5xl py-2 focus:outline-none"
                {...register("title")}
                name="title"
                id=""
                rows="1"
                placeholder="New post title here..."
              />
            </div>
            <div>
              <div className="flex space-x-2 items-center ">
                <div className="flex space-x-2 h-full">
                  <input
                    className="focus:outline-none"
                    {...register("tags")}
                    name="tags"
                    type="text"
                    placeholder="Add up to 4 tags..."
                  />
                </div>
              </div>
            </div>
            <div className="prose max-w-none">
              <ContentEditor name="content" control={control} />

              {/* <EditorForm /> */}
            </div>

            <div>
              <Button isFull hasBg>
                {newMode ? "Post" : "Update"}
              </Button>
            </div>
          </div>
        </form>
      )}
    </Fragment>
  );
};

export default PostEditor;
