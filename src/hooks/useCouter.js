import { useState } from "react";

const useCouter = (initValue) => {
  const [count, setCount] = useState(initValue);
  const increment = (value) => setCount(value);

  return { count, increment };
};

export default useCouter;
