import tw, { styled, css, theme } from "twin.macro";

const Button = styled.button(({ isText, isFull, isDanger, hasBg }) => [
  tw`border border-solid rounded-md text-blue-500 border-blue-500 hover:text-white hover:bg-blue-600 px-4 py-2`,
  css`
    :disabled {
      opacity: 0.4;
      background-color: ${theme`colors.gray.200`};
      border: none;
      color: #000;
    }
  `,
  isText &&
    tw`text-black border-transparent hover:(border-blue-500 bg-blue-100 text-blue-500)`,
  isFull && tw`w-full`,
  isDanger &&
    tw`bg-red-500 text-white border-transparent hover:(bg-red-500 opacity-80)`,
  hasBg && tw`bg-blue-500 text-white`,
]);

export default Button;
