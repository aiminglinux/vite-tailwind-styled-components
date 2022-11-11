import HeaderStyleDropdown from "./HeaderStyleDropdown";

export const BLOCK_TYPES = [
  { label: " “ ” ", style: "blockquote" },
  { label: "UL", style: "unordered-list-item" },
  { label: "OL", style: "ordered-list-item" },
  { label: "{ }", style: "code-block" },
];

export const HEADER_TYPES = [
  { label: "(None)", style: "unstyled" },
  { label: "H1", style: "header-one" },
  { label: "H2", style: "header-two" },
  { label: "H3", style: "header-three" },
  { label: "H4", style: "header-four" },
  { label: "H5", style: "header-five" },
  { label: "H6", style: "header-six" },
];

const BlockStyleToolbar = (props) => {
  return (
    <div className="p-2">
      <HeaderStyleDropdown
        headerOptions={HEADER_TYPES}
        onToggle={props.onToggle}
      />
    </div>
  );
};

export default BlockStyleToolbar;
