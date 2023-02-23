import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

import Portal from "../Portal";
import Backdrop from "./Backrop";

function Modal({
  children,
  isOpen,
  setOn,
  handleClose,
  handleAction,
  title,
  promptText,
  action = "Delete it",
}) {
  const nodeRef = useRef(null);

  useEffect(() => {
    if (document.body.style.overflow !== "hidden") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
    return () => (document.body.style = "unset");
  }, [isOpen]);

  useEffect(() => {
    const closeOnEscapeKey = (e) => (e.key === "Escape" ? handleClose() : null);
    document.body.addEventListener("keydown", closeOnEscapeKey);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [handleClose]);
  const handlePromptAction = () => {
    if (handleAction) handleAction();
    setOn(false);
  };

  if (!isOpen) return null;

  return (
    <Portal>
      {/* <Backdrop /> */}
      <div className="select-none justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-black bg-opacity-40">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed z-50 h-fit bg-white w-2/3 lg:w-1/3 top-1/2 -translate-y-1/2 mx-auto inset-0 rounded-md shadow-md"
          ref={nodeRef}
        >
          <div className="text-center">
            <h1 className="bg-blue-600 py-2 text-xl text-yellow-500 font-semibold rounded-t-md">
              {title}
            </h1>
            {promptText && (
              <p className="border-b-2 border-solid font-medium p-2 bg-yellow-200">
                {promptText}
              </p>
            )}
            {handleAction && (
              <div className="space-x-4 py-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.8 }}
                  onClick={handlePromptAction}
                  className=" text-red-600 border rounded-md border-solid p-2 hover:bg-red-100"
                >
                  Yes, {action}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.8 }}
                  onClick={() => setOn(false)}
                  className="border rounded-md border-solid p-2 hover:opacity-60"
                >
                  Cancel
                </motion.button>
              </div>
            )}
          </div>
          <div className="modal-content select-none px-4 py-6">{children}</div>
        </motion.div>
      </div>
    </Portal>
  );
}
export default Modal;
