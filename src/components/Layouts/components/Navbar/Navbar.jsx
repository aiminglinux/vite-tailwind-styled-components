import { faCode } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import tw from "twin.macro";

function Navbar() {
  return (
    <Wrapper>
      <Inner>
        <FontAwesomeIcon className="w-[34px] h-[34px]" icon={faCode} />
        <div className="w-[420px] h-[40px] relative flex items-center border rounded-md border-none">
          <input
            type="text"
            placeholder="Search..."
            spellCheck={false}
            autoComplete={false}
            className="bg-transparent invisible sm:visible outline-none w-full h-full pl-4 border-solid border rounded-md overflow-hidden hover:border-gray-400 focus:border-blue-600"
            // className="text-black flex-1 invisible sm:visible w-full outline-none pl-2 py-2 border-none"
          />
          <button className="absolute w-[38px] left-auto right-0 h-full px-2 hover:bg-blue-600 rounded-r-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-[24px] h-[24px]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </div>
        <div className="flex">
          <button className="btn-outline">Log in</button>
        </div>
      </Inner>
    </Wrapper>
  );
}
const Wrapper = tw.nav`w-full h-[56px] fixed left-0 top-0 z-30 shadow`;
const Inner = tw.div`max-w-screen-xl h-full mx-auto flex justify-between items-center px-2`;
const Logo = tw.svg`w-11 h-11 rounded-md`;
const LeftSide = tw.div`flex-1 flex items-center gap-2`;
const RightSide = tw.div`flex items-center gap-2 relative`;
const SearchIcon = tw.div`absolute top-1 bottom-1 right-1 w-10 text-2xl hover:(bg-red-200 text-blue-50) flex items-center justify-center rounded-md cursor-pointer`;
const Input = tw.input`text-black w-full outline-none pl-2 pr-12 py-2 border-2 rounded-md border-solid border-gray-50 hover:(border-gray-600) focus:(border-blue-400)`;

export default Navbar;
