import { useNavigate, useParams } from "react-router-dom";

import { useLazyLogoutQuery } from "../../core/features/auth/authApiSlice";
import useRequireAuthen from "../../hooks/useRequireAuthen";

import Button from "../../components/Button/Button";
import RouteWrapper from "../../components/RouteWrapper/RouteWrapper";

const Confirmation = () => {
  const navigate = useNavigate();
  const { confirmType } = useParams();
  const [trigger] = useLazyLogoutQuery();
  const { isAuthed, handleAuth } = useRequireAuthen();

  const handdleConfirm = async () => {
    if (isAuthed) {
      try {
        trigger();
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    } else handleAuth();
  };

  return (
    <RouteWrapper>
      <div className="">
        <div className="text-center space-y-4 mt-[30%]">
          <h1>Are you want to {confirmType}?</h1>
          <Button onClick={handdleConfirm} hasBg>
            Yes, sign out
          </Button>
        </div>
      </div>
    </RouteWrapper>
  );
};

export default Confirmation;
