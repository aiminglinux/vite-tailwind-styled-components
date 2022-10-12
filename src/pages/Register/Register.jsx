import tw from "twin.macro";
import RegisterForm from "./components/RegisterForm";
import { useSignUpMutation } from "../../core/features/auth/authApiSlice";

function Register() {
  const [signUp, { isLoading, isError }] = useSignUpMutation();
  const handleRegisterFormSubmit = async (values) => {
    console.log("Register data: ", values);
    // try {
    //   await signUp(values);
    // } catch (error) {
    //   console.log(error);
    // }
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
        <RegisterForm onSubmit={handleRegisterFormSubmit} />
      </Inner>
    </Wrapper>
  );
}

const Wrapper = tw.section`w-full md:w-[80%] lg:w-[60%] bg-white rounded-md border border-solid mx-auto`;
const Inner = tw.div`p-2 md:p-12 space-y-4`;
export default Register;
