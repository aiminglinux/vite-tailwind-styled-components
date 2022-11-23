import tw, { styled } from "twin.macro";

const Backdrop = ({ onClick }) => {
  return <Wrapper onClick={onClick} />;
};

const Wrapper = styled.div`
  background: rgba(0, 0, 0, 0.5);
  ${tw`w-full fixed absolute inset-0 -top-14 z-40`}
`;
export default Backdrop;
