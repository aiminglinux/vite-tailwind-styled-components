import { useDispatch, useSelector } from "react-redux";

import {
  selectCurrenToken,
  setAuthModal,
} from "../core/features/auth/authSlice";

const useRequireAuthen = () => {
  const token = useSelector(selectCurrenToken);
  const isAuthed = !!token;
  const dispatch = useDispatch();

  const handleAuth = () => !isAuthed && dispatch(setAuthModal(true));

  return { isAuthed, handleAuth };
};

export default useRequireAuthen;
