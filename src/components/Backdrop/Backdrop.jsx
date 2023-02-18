import tw, { styled } from "twin.macro";

const Backdrop = ({ onClick }) => {
  return <Wrapper onClick={onClick} />;
};

const Wrapper = styled.div`
  background: rgba(0, 0, 0, 0.5);
  ${tw`w-10 h-screen fixed absolute inset-0`}
`;
export default Backdrop;
