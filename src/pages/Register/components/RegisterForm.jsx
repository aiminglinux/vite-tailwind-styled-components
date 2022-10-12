import { yupResolver } from "@hookform/resolvers/yup";
import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import tw, { styled } from "twin.macro";
import * as yup from "yup";

import Button from "../../../components/Button/Button";

const RegisterSchema = yup.object().shape({
  email: yup.string().email().required(),
  name: yup.string().required(),
  username: yup
    .string()
    .matches(/^\S*$/, "Whitespace is not allowed in your username")
    .required(),
  password: yup.string().min(6).required(),
  password2: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password mismatch"),
});

const RegisterForm = ({ onSubmit }) => {
  const [avatar, setAvatar] = useState();
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(RegisterSchema),
  });

  const handleFormSubmit = (values) => {
    console.log(avatar);
    // if (!avatar) {
    //   const { name, email, username, password } = values;
    //   onSubmit({ name, email, username, password });
    //   return;
    // }
    // values.picture = avatar.preview;
    onSubmit(values);
  };

  const watchEmail = watch("email", false);

  const isValid =
    !errors.email &&
    !errors.password &&
    !errors.password &&
    !errors.username &&
    !errors.password2 &&
    watchEmail;

  const imgURL =
    "https://res.cloudinary.com/drkdy5tsq/image/upload/v1663835541/default/default-avatar_sbpczw.png";

  useEffect(() => {
    return () => {
      avatar && URL.revokeObjectURL(avatar.preview);
    };
  }, [avatar]);

  const onSelectFile = (e) => {
    const file = e.target.files[0];

    file.preview = URL.createObjectURL(file);

    setAvatar(file);
  };

  return (
    <Fragment>
      <Wrapper onSubmit={handleSubmit(handleFormSubmit)}>
        <Avatar>
          <img src={avatar ? avatar.preview : imgURL} alt="default-avatar" />
          <label htmlFor="avatar-upload">Upload your avatar</label>
          <input
            {...register("avatar")}
            id="avatar-upload"
            type="file"
            name="avatar"
            onChange={onSelectFile}
          />
        </Avatar>
        <div>
          <label htmlFor="name">Full name</label>
          <div
            className={`border border-solid rounded-md p-2 ${
              errors.name && `border-red-500`
            }`}
          >
            <input
              {...register("name")}
              name="name"
              className="w-full outline-none"
              placeholder="Enter your name"
            />
          </div>
          {errors.name && <p className="text-red-400">{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <div
            className={`border border-solid rounded-md p-2 ${
              errors.email && `border-red-500`
            }`}
          >
            <input
              {...register("email")}
              name="email"
              className="w-full outline-none"
              placeholder="Enter your email..."
            />
          </div>
          {errors.email && (
            <p className="text-red-400">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="username">Username</label>
          <div
            className={`border border-solid rounded-md p-2 ${
              errors.username && `border-red-500`
            }`}
          >
            <input
              {...register("username")}
              name="username"
              className="w-full outline-none"
              placeholder="Choose your username"
              onFocus={() =>
                setValue(
                  "username",
                  watchEmail ? watchEmail.split("@").shift() : ""
                )
              }
            />
          </div>
          {errors.username && (
            <p className="text-red-400">{errors.username.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <div
            className={`border border-solid rounded-md p-2 ${
              errors.email && `border-red-500`
            }`}
          >
            <input
              {...register("password")}
              type="password"
              name="password"
              className="w-full outline-none"
              placeholder="Enter your password"
            />
          </div>
          {errors.password && (
            <p className="text-red-400">{errors.password.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="password2">Re-type Password</label>
          <div
            className={`border border-solid rounded-md p-2 ${
              errors.email && `border-red-500`
            }`}
          >
            <input
              {...register("password2")}
              type="password"
              name="password2"
              className="w-full outline-none"
              placeholder="Re-type your password"
            />
          </div>
          {errors.password2 && (
            <p className="text-red-400">{errors.password2.message}</p>
          )}
        </div>

        <Button disabled={!isValid} isFull hasBg type="submit">
          Submit
        </Button>
        <div className="relative after:absolute after:content-[''] after:w-full after:border after:left-0 after:top-[50%]">
          <span className="z-50 inline-block bg-white relative ml-[50%] translate-x-[-50%] px-2">
            Already have an account? <Login to="/login">Log in</Login>
          </span>
        </div>
      </Wrapper>
    </Fragment>
  );
};
const Wrapper = tw.form`space-y-2`;
const Avatar = styled.div`
  ${tw`justify-center items-center flex flex-col space-y-2`};
  > img {
    ${tw`w-32 h-32 rounded-full border object-cover`}
  }
  > label {
    ${tw`border p-1 rounded-md`}
  }
  > input {
    ${tw`hidden`}
  }
`;

const Login = styled(Link).attrs({
  to: "/login",
})`
  ${tw`text-blue-500`}
`;
export default RegisterForm;
