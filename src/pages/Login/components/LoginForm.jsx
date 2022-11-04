import { yupResolver } from "@hookform/resolvers/yup";
import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import tw, { styled } from "twin.macro";
import * as yup from "yup";

import Button from "../../../components/Button/Button";

const LoginSchema = yup.object().shape({
  email: yup.string().required(),

  password: yup.string().min(6).required(),
});

const LoginForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema),
  });

  const handleFormSubmit = (values) => {
    // console.log("Login form Data: ", values);
    if (onSubmit) {
      onSubmit(values);
    }
  };

  const isValid = !errors.email && !errors.password;

  return (
    <Fragment>
      <Wrapper onSubmit={handleSubmit(handleFormSubmit)}>
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
        <Button disabled={!isValid} isFull hasBg type="submit">
          Log in
        </Button>

        <div className="relative after:absolute after:content-[''] after:w-full after:border after:left-0 after:top-[50%]">
          <span className="z-50 inline-block bg-white relative text-center mx-auto ml-[50%] translate-x-[-50%] px-2">
            Don't have an account? <Register to="/login">Register</Register>
          </span>
        </div>
      </Wrapper>
    </Fragment>
  );
};
const Wrapper = tw.form`space-y-4`;

const Register = styled(Link).attrs({
  to: "/auth/register",
})`
  ${tw`text-blue-500`}
`;
export default LoginForm;
