import { useMemo } from "react";
import { Controller } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";

import "easymde/dist/easymde.min.css";

const ContentEditor = ({ name, control }) => {
  const placeholderOpt = useMemo(() => {
    return {
      placeholder: "Write your post content here...",
      hideIcons: ["guide", "side-by-side", "fullscreen"],
      spellChecker: false,
    };
  }, []);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, name } }) => (
        <SimpleMDE
          options={placeholderOpt}
          name={name}
          value={value}
          onChange={onChange}
        />
      )}
    />
  );
};

export default ContentEditor;
