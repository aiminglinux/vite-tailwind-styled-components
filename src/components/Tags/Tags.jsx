import tw from "twin.macro";
const Tags = () => {
  return (
    <Wrapper>
      <TagHeader>Popular Tags</TagHeader>
      <TagList>
        <TagWrapper>#javascript</TagWrapper>
        <TagWrapper>#webdev</TagWrapper>
        <TagWrapper>#beginners</TagWrapper>
        <TagWrapper>#programming</TagWrapper>
        <TagWrapper>#tutorial</TagWrapper>
        <TagWrapper>#react</TagWrapper>
        <TagWrapper>#python</TagWrapper>
      </TagList>
    </Wrapper>
  );
};

const Wrapper = tw.nav`space-y-4`;
const TagHeader = tw.h2`font-bold`;
const TagList = tw.ul``;
const TagWrapper = tw.li`w-full inline-flex justify-start items-center gap-2 rounded-md text-black p-3 hover:text-blue-500 hover:bg-blue-100`;

export default Tags;
