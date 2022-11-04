import tw from "twin.macro";
import { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useLoginMutation } from "../../core/features/auth/authApiSlice";
import { setCredentials, setToken } from "../../core/features/auth/authSlice";
import useRequireAuthen from "../../hooks/useRequireAuthen";

import LoginForm from "./components/LoginForm";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

function Login() {
  const { isAuthed } = useRequireAuthen();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [login, { isLoading, isSuccess, isError, reset, error }] =
    useLoginMutation();

  useEffect(() => {
    if (isAuthed) navigate("/");
    reset();
    isSuccess && navigate("/");
  }, [isSuccess]);

  const handleLoginFormSubmit = async (data) => {
    // const { email, password } = values;
    try {
      const {
        _id: id,
        name,
        email,
        username,
        picture,
        website,
        location,
        bio,
        learning,
        skills,
        workingOn,
        availableFor,
        workingAt,
        education,
        createdAt,
        accessToken,
      } = await login(data).unwrap();
      dispatch(
        setCredentials({
          id,
          name,
          email,
          username,
          picture,
          website,
          location,
          bio,
          learning,
          skills,
          workingOn,
          availableFor,
          workingAt,
          education,
          createdAt,
        })
      );
      dispatch(setToken(accessToken));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      {isLoading && <LoadingSpinner />}
      <Wrapper>
        <Inner>
          {isError && (
            <div className="bg-red-200 rounded-md p-4">
              <h1 className="text-red-400 font-bold text-2xl">
                Hey, something went wrong:
              </h1>
              <ul className="text-lg">
                <li>&gt;&gt; {error?.data?.message}</li>
              </ul>
            </div>
          )}
          <div className="text-center space-y-2">
            <h1 className="font-bold text-4xl">Welcome to my community</h1>
            <p>
              This Community is the site just for learning Frontend technologies
              as HTML/CSS, ReactJS and NodeJS
            </p>
          </div>
          <LoginForm onSubmit={handleLoginFormSubmit} />
        </Inner>
      </Wrapper>
    </Fragment>
  );
}

const Wrapper = tw.section`w-full md:w-[80%] lg:w-[60%] bg-white rounded-md border border-solid mx-auto`;
const Inner = tw.div`p-2 md:p-12 space-y-4`;

export default Login;
