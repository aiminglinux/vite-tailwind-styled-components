import { createGlobalStyle } from 'styled-components';
import { theme } from 'twin.macro';

const GlobalReset = createGlobalStyle`
*,
*::before,
*::after {
  box-sizing: border-box;
  
}
path,
svg,
i::before,
i::after {
  transition: initial;
}

html {
  scroll-behavior: smooth;
}
body {
  min-height: 100vh
  text-rendering: optimizeSpeed;
  line-height: 1.5;
  background: ${theme`colors.gray.100`};
  position: relative;
  
}
body,
h1,
h2,
h3,
h4,
p,
figure,
blockquote,
dl,
dd,
ul,
ol {
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
}
button,
input {
  border: none;
  outline: none;
  cursor: pointer;
  font: inherit;
}
ul {
  list-style: none;
}
img,
picture {
  max-width: 100%;
  display: block;
}
.ck.ck-toolbar {
  position: absolute;
  top: -82px;
  border: 1px solid rgb(229, 231, 235);
  width: full;
}

.ck.ck-balloon-panel_visible {
  border: none;
  box-shadow: none;
}

.ck.ck-toolbar.ck-toolbar_floating {
  border: 1px solid rgb(229, 231, 235);
}

`;

export default GlobalReset;
