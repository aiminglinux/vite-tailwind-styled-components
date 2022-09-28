import tw from "twin.macro";

function Navbar() {
  return (
    <Wrapper>
      <Inner>
        <LeftSide>
          <Image>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
              />
            </svg>
          </Image>
          <Input placeholder="Search..." />
          <SearchIcon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </SearchIcon>
        </LeftSide>
        <RightSide></RightSide>
      </Inner>
    </Wrapper>
  );
}
const Wrapper = tw.nav`w-full h-[56px] fixed left-0 top-0 z-30 py-2 shadow`;
const Inner = tw.div`max-w-screen-xl h-full mx-auto flex justify-between items-center`;
const Image = tw.svg`w-11 h-11 rounded-md border-solid border-gray-600`;
const LeftSide = tw.div`flex-1 flex items-center gap-2`;
const RightSide = tw.div`flex items-center gap-2 relative`;
const SearchIcon = tw.div`absolute top-1 bottom-1 right-1 w-10 text-2xl hover:(bg-red-200 text-blue-50) flex items-center justify-center rounded-md cursor-pointer`;
const Input = tw.input`text-black w-full outline-none pl-2 pr-12 py-2 border-2 rounded-md border-solid border-gray-50 hover:(border-gray-600) focus:(border-blue-400)`;

export default Navbar;
