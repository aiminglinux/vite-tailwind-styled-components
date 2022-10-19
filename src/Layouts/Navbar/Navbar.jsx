import { Link } from "react-router-dom";
import tw, { styled, theme } from "twin.macro";

import {
  AiOutlineMenuFold,
  AiOutlineSearch,
  AiOutlineCode,
  AiOutlineBell,
} from "react-icons/ai";

import useBreakpoint from "../../hooks/useBreakpoint";
import useToggle from "../../hooks/useToggle";

import Button from "../../components/Button/Button";
import MobileMenu from "./components/MobileMenu";
import { useEffect, useRef } from "react";

function Navbar() {
  const navBarRef = useRef(null);
  const isMobile = useBreakpoint(theme`screens.md`.replace("px", ""));
  const [mobileMenu, toggleMobileMenu] = useToggle(false);
  const [profileMenu, toggleProfileMenu] = useToggle(false);

  useEffect(() => {
    const closeProfileMenu = (e) => {
      if (navBarRef.current.contains(e.target)) return;
      toggleProfileMenu(false);
    };
    document.addEventListener("mousedown", closeProfileMenu);
    return () => document.removeEventListener("mousedown", closeProfileMenu);
  }, []);

  return (
    <Wrapper ref={navBarRef}>
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
            <div>
              <Button>Create Post</Button>
            </div>

            <Link to="#!" className="relative hover:bg-blue-200 p-1 rounded-md">
              <AiOutlineBell size={32} />
              <div className="absolute top-0 right-1 bg-red-400 border text-xs px-1 w-5 h-5 items-center justify-center inline-flex rounded-full">
                <small className="text-lg">3</small>
              </div>
            </Link>

            <div>
              <Avatar
                id="avatar"
                src="http://res.cloudinary.com/drkdy5tsq/image/upload/v1665634943/Profiles/ep8km7ckf3donawg7jze.jpg"
                onClick={toggleProfileMenu}
              />
            </div>
            {profileMenu && (
              <ProfileMenu onClick={toggleProfileMenu}>
                <MenuList>
                  <MenuItem>
                    <Link to="profile">
                      <div>
                        <span className="block">freeman</span>
                        <small>@freeman</small>
                      </div>
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to="dashboard">Dashboard</Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to="create-post">Create Post</Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to="reading-list">Reading List</Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to="edit-profile">Settings</Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to="#!">Log Out</Link>
                  </MenuItem>
                </MenuList>
              </ProfileMenu>
            )}

            {/* <Link to="login">
              <Button isText>Log in</Button>
            </Link>
            <Link to="register">
              <Button>Create account</Button>
            </Link> */}
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
const RightSide = tw.div`flex items-center relative space-x-4`;
const SearchBar = tw.div`min-w-[420px] h-[40px] relative flex items-center border rounded-md border-none`;
const SearchInput = tw.input`bg-transparent invisible sm:visible outline-none w-full h-full cursor-text pl-4 border-solid border border-gray-200 rounded-md overflow-hidden hover:border-gray-400 focus:border-blue-600`;
const SearchButton = tw.button`absolute w-[38px] left-auto right-0 h-full px-2 hover:bg-blue-500 rounded-r-md`;
const ProfileMenu = tw.div`absolute ml-0 list-none no-underline bg-white right-0 top-14 border border-solid rounded-md w-64 p-2 [a]:(block w-full p-2 rounded-md)`;
const MenuList = tw.ul`space-y-2`;
const MenuItem = styled.li`
  margin: ${theme`spacing.1`};
  & > a {
    ${tw`hover:bg-blue-100`}
  }
  &:first-child > a {
    margin-bottom: ${theme`spacing.2`};
  }
  &:first-child {
    border-bottom: 1px solid ${theme`colors.gray.200`};
  }
  &:last-child {
    border-top: 1px solid ${theme`colors.gray.200`};
  }
  &:last-child > a {
    margin-top: ${theme`spacing.2`};
  }
`;
const Avatar = styled.img`
  ${tw`w-12 rounded-full object-cover overflow-hidden cursor-pointer hover:opacity-80`}
`;

export default Navbar;
