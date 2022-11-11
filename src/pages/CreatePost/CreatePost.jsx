import { yupResolver } from "@hookform/resolvers/yup";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
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

  const [file, setFile] = useState();
  const previewURL = useBase64(file);
  const { isAuthed, handleAuth } = useRequireAuthen();
  const currentUser = useSelector(selectCurrentUser);
  const [createNewPost, { isLoading, isError }] = useCreatePostMutation();

  const handlePostSubmit = async (data) => {
    console.log(data);
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
              <label
                htmlFor="filePickup"
                className="border-2 border-solid rounded-md p-2"
              >
                Add cover image
              </label>
              <input
                {...register("file")}
                name="file"
                id="filePickup"
                className="invisible"
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <img className="w-32" src={previewURL?.toString()} alt="img" />
            </div>
            <div>
              <textarea
                className="w-full outline-none resize-none placeholder:text-gray-400 text-5xl py-2 focus:outline-none"
                {...register("title")}
                name="title"
                id=""
                rows="1"
                placeholder="New post title here..."
              ></textarea>
            </div>
            <div>
              <div className="flex space-x-2 items-center">
                <div className="flex space-x-2 h-full">
                  <input
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
