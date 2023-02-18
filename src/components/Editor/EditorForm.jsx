import { Editor, EditorState, RichUtils } from "draft-js";
import { Fragment, useRef, useState } from "react";
import "draft-js/dist/Draft.css";

import {
  AiOutlineBold,
  AiOutlineItalic,
  AiOutlineStrikethrough,
  AiOutlineUnderline,
} from "react-icons/ai";

import { GrBlockQuote } from "react-icons/gr";
import BlockStyleToolbar from "./components/blockStyles/BlockStyleToolbar";

const EditorForm = () => {
  const editorRef = useRef();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const onEditorFocus = () => {
    editorRef.current.focus();
  };

  const onEditorStateChange = (editorState) => [setEditorState(editorState)];
  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onEditorStateChange(newState);
      return "handled";
    }
    return "not-handled";
  };
  const onBoldClick = (e) => {
    e.preventDefault();
    onEditorStateChange(RichUtils.toggleInlineStyle(editorState, "BOLD"));
  };
  const onItalicClick = (e) => {
    e.preventDefault();
    onEditorStateChange(RichUtils.toggleInlineStyle(editorState, "ITALIC"));
  };
  const onUnderlineClick = (e) => {
    e.preventDefault();
    onEditorStateChange(RichUtils.toggleInlineStyle(editorState, "UNDERLINE"));
  };
  const onStrikethroughClick = (e) => {
    e.preventDefault();
    onEditorStateChange(
      RichUtils.toggleInlineStyle(editorState, "STRIKETHROUGH")
    );
  };
  const toggleBlockType = (blockType) => {
    onEditorStateChange(RichUtils(toggleBlockType(editorState, blockType)));
  };

  return (
    <div className="border">
      <div className="bg-gray-200 flex items-center border">
        <BlockStyleToolbar
          editorState={editorState}
          onToggle={toggleBlockType}
        />

        <button
          className=" p-2 hover:text-blue-300 hover:bg-blue-200 hover:rounded-md"
          onClick={onBoldClick}
        >
          <AiOutlineBold size={20} />
        </button>
        <button
          className=" p-2 hover:text-blue-300 hover:bg-blue-200 hover:rounded-md"
          onClick={onItalicClick}
        >
          <AiOutlineItalic size={20} />
        </button>
        <button
          className=" p-2 hover:text-blue-300 hover:bg-blue-200 hover:rounded-md"
          onClick={onUnderlineClick}
        >
          <AiOutlineUnderline size={20} />
        </button>
        <button
          className=" p-2 hover:text-blue-300 hover:bg-blue-200 hover:rounded-md"
          onClick={onStrikethroughClick}
        >
          <AiOutlineStrikethrough size={20} />
        </button>
      </div>
      <div className="p-2 min-h-[30%]" onClick={onEditorFocus}>
        <Editor
          editorState={editorState}
          onChange={onEditorStateChange}
          handleKeyCommand={handleKeyCommand}
          ref={editorRef}
          placeholder="Add to the discussion"
        />
      </div>
    </div>
  );
};

export default EditorForm;
