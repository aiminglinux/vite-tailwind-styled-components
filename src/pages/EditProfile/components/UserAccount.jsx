import { yupResolver } from "@hookform/resolvers/yup";
import { Fragment } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useOutletContext } from "react-router-dom";
import * as yup from "yup";

import Button from "../../../components/Button/Button";
import Modal from "../../../components/Portal/Component/Modal";

import useToggle from "../../../hooks/useToggle";

const accountScheme = yup.object().shape({
  currentPwd: yup.string(),
  password: yup.string(),
  password2: yup.string(),
});

const handleFormSubmit = (data) => {
  console.log(data);
};

const UserAccount = () => {
  const currentUser = useOutletContext();
  const navigate = useNavigate();
  const [openModal, toggleOpenModal] = useToggle(false);

  const {
    register,
    handleSubmit,
    formState: { errors, invalid },
  } = useForm({
    reValidateMode: "onBlur",
    resolver: yupResolver(accountScheme),
  });

  return (
    <Fragment>
      {openModal && (
        <Modal
          isOpen={openModal}
          setOn={toggleOpenModal}
          title={`Delete your account?`}
          promptText={`Are you sure to delete your account? This will remove your account from our database
            and can't be undone.`}
          // handleAction={handleDeletePost}
          action={`Delete account`}
        />
      )}
      <div className="mb-16 space-y-2">
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="bg-white w-full p-4 rounded-md grid gap-4"
        >
          <h2 className="text-4xl font-semibold">Account email(s)</h2>
          <div className="flex flex-col space-y-2">
            <ul>
              <li className="space-x-2">
                <strong className="text-gray-600">Primary email:</strong>
                <span>{currentUser?.email}</span>
              </li>
            </ul>
          </div>
        </form>
        <div className="bg-white w-full p-4 rounded-md grid gap-4">
          <h2 className="text-4xl font-semibold">Set new password</h2>
          <div className="flex flex-col space-y-2">
            <label htmlFor="website">Current password</label>
            <input
              {...register("currentPwd")}
              name="currentPwd"
              type="password"
              id="currentPwd"
              className="border border-solid p-2 rounded-md border-gray-300 cursor-text"
            />
            {errors.currentPwd && (
              <p className="text-red-400">{errors.currentPwd.message}</p>
            )}
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="password">Password</label>
            <input
              {...register("password")}
              name="password"
              id="password"
              type="password"
              className="border border-solid p-2 rounded-md border-gray-300 cursor-text"
            />
            {errors.password && (
              <p className="text-red-400">{errors.password.message}</p>
            )}
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="password2">Re-type password</label>
            <input
              {...register("password2")}
              name="password2"
              id="password2"
              type="password"
              className="border border-solid p-2 rounded-md border-gray-300 cursor-text"
            />
            {errors.password2 && (
              <p className="text-red-400">{errors.password2.message}</p>
            )}
          </div>
          <div className="inline">
            <Button hasBg disabled={invalid}>
              Set new password
            </Button>
          </div>
        </div>
        <div className="bg-white w-full p-4 rounded-md grid gap-4">
          <h2 className="text-4xl text-red-500 font-semibold">Danger Zone</h2>
          <div className="grid gap-2 space-y-2">
            <h3 className="text-lg font-semibold">Delete account</h3>
            <p>Deleting your account will:</p>
            <ul className="list-disc pl-6">
              <li>
                Delete your profile, along with your authentication
                associations. This does not include applications permissions.
                You will have to remove them yourself:
                <ul className="list-disc pl-6 text-blue-500">
                  <li>
                    <a href="https://github.com/settings/applications">
                      GitHub profile settings
                    </a>
                  </li>
                  <li>
                    <a href="https://myaccount.google.com/security">
                      Google profile settings
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                Delete any and all content you have, such as articles, comments,
                or your reading list.
              </li>
              <li>Allow your username to become available to anyone.</li>
            </ul>
            <div className="inline">
              <Button isDanger onClick={toggleOpenModal}>
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UserAccount;
