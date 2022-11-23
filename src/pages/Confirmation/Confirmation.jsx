import { useNavigate, useParams } from "react-router-dom";

import { useLazyLogoutQuery } from "../../core/features/auth/authApiSlice";
import { useDeletePostMutation } from "../../core/features/posts/postsApiSlice";
import useRequireAuthen from "../../hooks/useRequireAuthen";

import Button from "../../components/Button/Button";
import RouteWrapper from "../../components/RouteWrapper/RouteWrapper";
import { capitalFirstLetter } from "../../utils/string";

const Confirmation = () => {
  const navigate = useNavigate();
  const { confirmType, postSlug, username } = useParams();
  const [trigger] = useLazyLogoutQuery();
  const { isAuthed, handleAuth } = useRequireAuthen();
  const [deletePost, { isLoading }] = useDeletePostMutation();

  const handleConfirm = async () => {
    if (isAuthed) {
      try {
        confirmType.includes("delete-post") &&
          (await deletePost({ url: `${username}/${postSlug}` }).unwrap());
        confirmType.includes("delete-account") &&
          console.log("deleting account");
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
          <Button onClick={handleConfirm} hasBg>
            Yes, {capitalFirstLetter(confirmType.replace("-", " "))}
          </Button>
        </div>
      </div>
    </RouteWrapper>
  );
};

export default Confirmation;
