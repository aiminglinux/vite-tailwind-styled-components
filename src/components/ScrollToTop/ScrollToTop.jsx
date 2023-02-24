import React, { useEffect, useState } from "react";
import { FaArrowCircleUp } from "react-icons/fa";
import { BsArrowUpCircle } from "react-icons/bs";

import { styled } from "twin.macro";

const ScrollButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisible);
    return () => window.removeEventListener("scroll", toggleVisible);
  });

  return (
    <Button>
      <BsArrowUpCircle
        onClick={scrollToTop}
        size={32}
        style={{ display: visible ? "inline" : "none" }}
      />
    </Button>
  );
};

const Button = styled.div`
  position: fixed;
  width: 100%;
  left: 90%;
  bottom: 100px;
  height: 20px;
  font-size: 3rem;
  z-index: 1;
  cursor: pointer;
  color: green;
`;
export default ScrollButton;
