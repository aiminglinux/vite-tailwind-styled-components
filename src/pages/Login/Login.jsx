import tw from "twin.macro";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../core/features/auth/authApiSlice";
import { setCredentials, setToken } from "../../core/features/auth/authSlice";

import LoginForm from "./components/LoginForm";
import { useEffect } from "react";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading, isSuccess, isError, reset }] = useLoginMutation();

  useEffect(() => {
    reset();
    isSuccess && navigate("/");
  }, [isSuccess]);

  const handleLoginFormSubmit = async (values) => {
    const { email, password } = values;
    try {
      const {
        id,
        name,
        username,
        picture,
        bio,
        location,
        education,
        work,
        availableFor,
        skills,
        createdAt,
        accessToken,
      } = await login({ email, password }).unwrap();
      dispatch(
        setCredentials({
          id,
          name,
          username,
          email,
          picture,
          bio,
          location,
          education,
          work,
          availableFor,
          skills,
          createdAt,
        })
      );
      dispatch(setToken(accessToken));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper>
      <Inner>
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
  );
}

const Wrapper = tw.section`w-full md:w-[80%] lg:w-[60%] bg-white rounded-md border border-solid mx-auto`;
const Inner = tw.div`p-2 md:p-12 space-y-4`;

export default Login;
