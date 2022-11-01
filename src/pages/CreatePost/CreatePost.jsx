import "easymde/dist/easymde.min.css";
import { useCallback, useMemo, useState } from "react";
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Button from "../../components/Button/Button";
import TagList from "./components/TagList";

import useBase64 from "../../hooks/useBase64";

const defaultValues = {
  simpleMDEInput: "",
};

const postSchema = yup.object().shape({
  title: yup.string().required("Title: cannot be blank"),
  // simpleMDEIput: yup.string().required("Content: cannot be blank"),
});

const CreatePost = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onBlur",
    defaultValues,
    resolver: yupResolver(postSchema),
  });

  const [tags, setTags] = useState([]);
  const [file, setFile] = useState(null);
  const [body, setBody] = useState(null);

  const handleSpacebarPress = (e) => {
    if (e.target.value.trim().length === 0) return;
    if (e.keyCode === 32) {
      setTags([...tags, e.target.value.trim()]);
      reset({
        tag: "",
      });
    }
  };

  const onBlurHandler = (e) => {
    if (e.target.value.trim().length === 0) return;
    setTags([...tags, e.target.value.trim()]);
    reset({
      tag: "",
    });
  };

  const onMDEChange = useCallback((body) => {
    setBody(body);
  }, []);

  const placeholderOpt = useMemo(() => {
    return {
      placeholder: "Write your post content here...",
    };
  }, []);

  const removeTag = (idx) => {
    console.log("remove tag: ", idx);
    setTags((prev) => prev.filter((tags, i) => i !== idx));
  };

  const handlePost = (value) => {
    console.log(value);
  };

  return (
    <form
      className="border border-solid rounded-md bg-white max-w-screen-lg mx-auto p-4"
      onSubmit={handleSubmit(handlePost)}
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
        {/* {errors.simpleMDEInput && (
          <div className="bg-red-200 rounded-md p-4">
            <h1 className="text-red-400 font-bold text-2xl">
              Hey, something went wrong:
            </h1>
            <ul className="text-lg">
              <li>&gt;&gt; {errors.simpleMDEInput.message}</li>
            </ul>
          </div>
        )} */}
        <div>
          <label
            htmlFor="filePickup"
            className="border-2 border-solid rounded-md p-2"
          >
            Add cover image
          </label>
          <input id="filePickup" className="invisible" type="file" />
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
          <div className="flex space-x-2 items-center h-10">
            <TagList tags={tags} onClick={removeTag} />
            <div className="flex space-x-2 h-full">
              {tags.length < 4 && (
                <input
                  {...register("tag")}
                  name="tag"
                  type="text"
                  placeholder={
                    tags.length > 0 ? "Add another..." : "Add up to 4 tags..."
                  }
                  onBlur={onBlurHandler}
                  onKeyDown={handleSpacebarPress}
                />
              )}
            </div>
          </div>
        </div>
        <div className="prose max-w-none">
          <Controller
            name="simpleMDEInput"
            control={control}
            render={({ field }) => (
              <SimpleMDE
                {...field}
                options={placeholderOpt}
                value={body}
                onChange={onMDEChange}
              />
            )}
            // onChange={onMDEChange}
          />
        </div>
        <div>
          <Button isFull hasBg>
            Post
          </Button>
        </div>
      </div>
    </form>
  );
};

export default CreatePost;
