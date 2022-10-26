import tw from "twin.macro";

import NavMenu from "../../components/NavMenu/NavMenu";
import Tags from "../../components/Tags/Tags";

function LeftSideBar() {
  return (
    <Wrapper>
      <NavMenu />
      <Tags />
    </Wrapper>
  );
}

const Wrapper = tw.aside`hidden md:block space-y-4`;
export default LeftSideBar;
