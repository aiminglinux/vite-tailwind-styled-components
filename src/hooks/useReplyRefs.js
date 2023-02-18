import { useRef } from "react";

function useReplyRefs() {
  const replyRefs = useRef({});

  function getRef(id) {
    if (!replyRefs.current[id]) {
      replyRefs.current[id] = useRef(null);
    }
    return replyRefs.current[id];
  }

  return getRef;
}

export default useReplyRefs;
