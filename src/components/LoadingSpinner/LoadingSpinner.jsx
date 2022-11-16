import tw, { theme } from "twin.macro";
import { MoonLoader, DotLoader, HashLoader } from "react-spinners";

const LoadingSpinner = () => {
  return (
    <Wrapper>
      <HashLoader color={theme`colors.blue.600`} speedMultiplier={0.6} />
    </Wrapper>
  );
};

const Wrapper = tw.div`w-full h-full flex justify-center items-center`;

export default LoadingSpinner;
