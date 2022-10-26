import "easymde/dist/easymde.min.css";
import { useCallback, useMemo, useState } from "react";
import SimpleMDE from "react-simplemde-editor";
import Button from "../../components/Button/Button";

import useBase64 from "../../hooks/useBase64";

const CreatePost = () => {
  const [file, setFile] = useState(null);
  const [body, setBody] = useState(null);
  const onChange = useCallback((body) => {
    setBody(body);
  }, []);

  const placeholderOpt = useMemo(() => {
    return {
      placeholder: "Write your post content here...",
    };
  }, []);

  const handlePost = (e) => {
    e.preventDefault();
    console.log("Submited");
  };

  return (
    <form
      className="border border-solid rounded-md bg-white max-w-screen-lg mx-auto p-4"
      onSubmit={handlePost}
    >
      <div className="space-y-4">
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
            name=""
            id=""
            rows="1"
            placeholder="New post title here..."
          ></textarea>
        </div>
        <div>
          <div className="flex">
            <ul className="flex space-x-2">
              <li>#tag</li>
              <li>
                <input type="text" placeholder="Add up to 4 tags..." disabled />
              </li>
            </ul>
          </div>
        </div>
        <div className="prose max-w-none">
          <SimpleMDE
            options={placeholderOpt}
            value={body}
            onChange={onChange}
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
