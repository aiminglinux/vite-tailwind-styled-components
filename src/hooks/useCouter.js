import { useState } from "react";

const useCouter = (initValue) => {
  const [count, setCount] = useState(initValue);
  const increment = (value) => setCount(value);
  //   const decrement = () => setCount(count-=1)

  return { count, increment };
};

export default useCouter;
