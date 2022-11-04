import { useNavigate, useParams } from "react-router-dom";

import { useLazyLogoutQuery } from "../../core/features/auth/authApiSlice";
import useRequireAuthen from "../../hooks/useRequireAuthen";

import Button from "../../components/Button/Button";
import RouteWrapper from "../../components/RouteWrapper/RouteWrapper";
import { capitalFirstLetter } from "../../utils/string";

const Confirmation = () => {
  const navigate = useNavigate();
  const { confirmType } = useParams();
  const [trigger] = useLazyLogoutQuery();
  const { isAuthed, handleAuth } = useRequireAuthen();

  const handdleConfirm = async () => {
    if (isAuthed) {
      try {
        confirmType.includes("delete") &&
          console.log("Waiting for deletion...");
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
          <h1>Are you want to {confirmType.replace("-", " ")}?</h1>
          <Button onClick={handdleConfirm} hasBg>
            Yes, {capitalFirstLetter(confirmType.replace("-", " "))}
          </Button>
        </div>
      </div>
    </RouteWrapper>
  );
};

export default Confirmation;
