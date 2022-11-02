import tw from "twin.macro";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

import { useSignUpMutation } from "../../core/features/auth/authApiSlice";

import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import RegisterForm from "./components/RegisterForm";

function Register() {
  const [signUp, { isLoading, isError, error }] = useSignUpMutation();
  const navigate = useNavigate();
  const handleRegisterFormSubmit = async (values) => {
    try {
      await signUp(values).unwrap();
      navigate("auth/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
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
                This Community is the site just for learning Frontend
                technologies as HTML/CSS, ReactJS and NodeJS
              </p>
            </div>
            <RegisterForm onSubmit={handleRegisterFormSubmit} />
          </Inner>
        </Wrapper>
      )}
    </Fragment>
  );
}

const Wrapper = tw.section`w-full md:w-[80%] lg:w-[60%] bg-white rounded-md border border-solid mx-auto`;
const Inner = tw.div`p-2 md:p-12 space-y-4`;
export default Register;
