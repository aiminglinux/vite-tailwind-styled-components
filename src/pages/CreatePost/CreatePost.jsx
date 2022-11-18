import { yupResolver } from "@hookform/resolvers/yup";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCurrentUser } from "../../core/features/auth/authSlice";
import { useCreatePostMutation } from "../../core/features/posts/postsApiSlice";
import * as yup from "yup";

import useBase64 from "../../hooks/useBase64";
import useRequireAuthen from "../../hooks/useRequireAuthen";

import ContentEditor from "./components/Editor";
import Button from "../../components/Button/Button";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const defaultValues = {
  content: "",
};

const postSchema = yup.object().shape({
  title: yup.string().required("Title: cannot be blank"),
});

const CreatePost = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues,
    resolver: yupResolver(postSchema),
  });

  const navigate = useNavigate();
  const [file, setFile] = useState();
  const previewURL = useBase64(file);
  const { isAuthed, handleAuth } = useRequireAuthen();
  const currentUser = useSelector(selectCurrentUser);
  const [createNewPost, { isLoading, isError }] = useCreatePostMutation();

  const handlePostSubmit = async (data) => {
    const { title, content, tags } = data;

    // console.log(content);
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

  return (
    <Fragment>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <form
          className="border border-solid rounded-md bg-white max-w-screen-lg mx-auto p-4"
          onSubmit={handleSubmit(handlePostSubmit)}
        >
          <div className="space-y-4">
            {errors.title && (
              <div className="bg-red-200 rounded-md p-4">
                <h1 className="text-red-400 font-bold text-2xl">
                  Hey, something went wrong:
                </h1>
                <ul className="text-lg">
                  <li>&gt;&gt; {errors.title.message}</li>
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
                Post
              </Button>
            </div>
          </div>
        </form>
      )}
    </Fragment>
  );
};

export default CreatePost;
