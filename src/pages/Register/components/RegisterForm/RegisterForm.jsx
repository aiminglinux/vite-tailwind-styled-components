import { Fragment } from "react";
import { Link } from "react-router-dom";
import tw, { styled } from "twin.macro";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Button from "../../../../components/Button/Button";

const RegisterSchema = yup.object().shape({
  email: yup.string().email().required(),
  username: yup
    .string()
    .matches(/^\S*$/, "Whitespace is not allowed in your username")
    .required(),
});

const RegisterForm = ({ handleRegisterFormSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(RegisterSchema),
  });

  const handleFormSubmit = (values) => {
    console.log("Register form Data: ", values);
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-2">
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
          <div className="border border-solid rounded-md p-2">
            <input
              {...register("username")}
              name="username"
              className="w-full outline-none"
              placeholder="Choose your username"
            />
          </div>
          {errors.username && (
            <p className="text-red-400">{errors.username.message}</p>
          )}
        </div>
        <Button isFull hasBg type="submit">
          Submit
        </Button>
        <div className="relative after:absolute after:content-[''] after:w-full after:border after:left-0 after:top-[50%]">
          <span className="z-50 inline-block bg-white relative text-center mx-auto ml-[50%] translate-x-[-50%] px-2">
            Already have an account? <Login to="/login">Log in</Login>
          </span>
        </div>
      </form>
    </Fragment>
  );
};
const Login = styled(Link).attrs({
  to: "/login",
})`
  ${tw`text-blue-500`}
`;
export default RegisterForm;
