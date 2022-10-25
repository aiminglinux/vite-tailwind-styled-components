import tw from "twin.macro";

const RouteWrapper = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

const Wrapper = tw.div`w-full`;
export default RouteWrapper;
