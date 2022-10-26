import { Link } from "react-router-dom";
import tw, { styled } from "twin.macro";
import useRequireAuthen from "../../hooks/useRequireAuthen";

import Button from "../Button/Button";
import {
  AiOutlineHome,
  AiOutlineTags,
  AiOutlineQuestion,
  AiOutlineInfoCircle,
  AiOutlineContacts,
} from "react-icons/ai";

const NavMenu = () => {
  const { isAuthed } = useRequireAuthen();
  return (
    <Wrapper>
      {!isAuthed && (
        <Community>
          <CompHeading>
            <span>My Community</span> is the site just for learning Frontend
            technologies as HTML/CSS, ReactJS and NodeJS
          </CompHeading>
          <Auth>
            <Register>
              <Button isFull> Create account</Button>
            </Register>
            <Login>
              <Button isText isFull>
                Log in
              </Button>
            </Login>
          </Auth>
        </Community>
      )}
      <PublicLink>
        <Link to="/">
          <LinkWrapper>
            <AiOutlineHome size={24} />
            Home
          </LinkWrapper>
          <LinkWrapper>
            <AiOutlineTags size={24} />
            Tags
          </LinkWrapper>
          <LinkWrapper>
            <AiOutlineQuestion size={24} />
            FAQ
          </LinkWrapper>
          <LinkWrapper>
            <AiOutlineInfoCircle size={24} />
            About
          </LinkWrapper>
          <LinkWrapper>
            <AiOutlineContacts size={24} />
            Contact
          </LinkWrapper>
        </Link>
      </PublicLink>
    </Wrapper>
  );
};

const Wrapper = tw.nav`space-y-4`;
const Community = tw.div`p-4 border border-solid space-y-2 bg-white rounded-md`;
const CompHeading = styled.h2`
  > span {
    ${tw`text-3xl font-bold text-blue-500`}
  }
`;
const Login = styled(Link).attrs({
  to: "auth/login",
})``;
const Register = styled(Link).attrs({
  to: "auth/register",
})`
  > button {
    ${tw`mb-2`}
  }
`;
const Auth = tw.div``;
const PublicLink = tw.ul``;
const LinkWrapper = tw.li`w-full inline-flex justify-start items-center gap-2 rounded-md text-black p-3 hover:text-blue-500 hover:bg-blue-100`;
export default NavMenu;
