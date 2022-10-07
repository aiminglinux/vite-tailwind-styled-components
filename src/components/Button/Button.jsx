import tw, { styled } from "twin.macro";

const Button = styled.button(({ isText, isFull }) => [
  tw`border border-solid rounded-md text-blue-500 border-blue-500 hover:text-white hover:bg-blue-600 px-2 py-2`,
  isText &&
    tw`text-black border-transparent hover:(border-blue-500 bg-blue-100 text-blue-500)`,
  isFull && tw`w-full`,
]);

export default Button;
