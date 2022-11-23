import { useEffect, useRef } from "react";
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
  navigate,
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
      <Backdrop />
      <div
        className="absolute z-50 h-fit bg-slate-50 w-2/3 lg:w-1/2 top-1/2 lg:top-1/4 mx-auto text-center inset-0 rounded-md"
        ref={nodeRef}
      >
        <div className="space-y-4">
          <h1 className="bg-blue-200 py-2 text-xl font-semibold rounded-t-md">
            {title}
          </h1>
          <p>{promptText}</p>
          <div className="space-x-4 py-2">
            <button
              onClick={handlePromptAction}
              className=" text-red-600 border rounded-md border-solid p-2 hover:bg-red-100"
            >
              Yes, {action}
            </button>
            <button
              onClick={() => setOn(false)}
              className="border rounded-md border-solid p-2 hover:opacity-60"
            >
              Cancel
            </button>
          </div>
        </div>
        <div className="modal-content">{children}</div>
      </div>
    </Portal>
  );
}
export default Modal;
