import { VscClose } from "react-icons/vsc";
import { BsHash } from "react-icons/bs";

const TagList = ({ tags, onClick }) => {
  return (
    <div className="flex space-x-2">
      {tags.map((tag, index) => (
        <div
          className="flex space-x-1 bg-gray-300 px-4 py-2 rounded-md"
          key={index}
        >
          <span className="flex select-none">
            <BsHash size={24} />
            {tag}
          </span>
          <span className="hover:text-red-500" onClick={() => onClick(index)}>
            <VscClose size={24} />
          </span>
        </div>
      ))}
    </div>
  );
};

export default TagList;
