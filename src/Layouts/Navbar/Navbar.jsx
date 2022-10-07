import { Link } from "react-router-dom";
import tw, { styled, theme } from "twin.macro";

import {
  AiOutlineMenuFold,
  AiOutlineSearch,
  AiOutlineCode,
} from "react-icons/ai";

import useBreakpoint from "../../hooks/useBreakpoint";
import useToggle from "../../hooks/useToggle";

import Button from "../../components/Button/Button";
import MobileMenu from "./components/MobileMenu";

function Navbar() {
  const isMobile = useBreakpoint(theme`screens.md`.replace("px", ""));
  const [mobileMenu, toggleMobileMenu] = useToggle(false);
  console.log(isMobile);
  return (
    <Wrapper>
      <Inner>
        <LeftSide>
          {isMobile && (
            <MobMenu onClick={toggleMobileMenu}>
              <AiOutlineMenuFold size={24} />
            </MobMenu>
          )}
          <Logo>
            <AiOutlineCode />
          </Logo>
          {isMobile && mobileMenu && (
            <MobileMenu toggleMobileMenu={toggleMobileMenu} />
          )}
        </LeftSide>

        <SearchBar>
          <SearchInput />
          <SearchButton>
            <AiOutlineSearch size={24} />
          </SearchButton>
        </SearchBar>
        {!isMobile && (
          <RightSide>
            <Link to="login">
              <Button isText>Log in</Button>
            </Link>
            <Link to="register">
              <Button>Create account</Button>
            </Link>
          </RightSide>
        )}
      </Inner>
    </Wrapper>
  );
}
const Wrapper = tw.nav`w-full h-14 bg-white fixed left-0 top-0 z-30 shadow`;
const Inner = tw.div`max-w-screen-xl h-full mx-auto flex justify-between items-center px-4`;
const LeftSide = tw.div`flex `;
const MobMenu = styled.div`
  > svg {
    ${tw`w-12 h-12`}
  }
`;
const Logo = styled(Link).attrs({
  to: "/",
})`
  > svg {
    ${tw`w-12 h-12`}
  }
`;
const RightSide = tw.div`space-x-2`;
const SearchBar = tw.div`min-w-[420px] h-[40px] relative flex items-center border rounded-md border-none`;
const SearchInput = tw.input`bg-transparent invisible sm:visible outline-none w-full h-full cursor-text pl-4 border-solid border border-gray-200 rounded-md overflow-hidden hover:border-gray-400 focus:border-blue-600`;
const SearchButton = tw.button`absolute w-[38px] left-auto right-0 h-full px-2 hover:bg-blue-500 rounded-r-md`;

export default Navbar;
