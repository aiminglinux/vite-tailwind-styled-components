import tw from "twin.macro";
import RegisterForm from "./components/RegisterForm/RegisterForm";

function Register() {
  const handleRegisterFormSubmit = (values) => {
    console.log("Register data: ", values);
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

const Wrapper = tw.section`w-full md:w-[60%] bg-white rounded-md border border-solid mx-auto`;
const Inner = tw.div`p-2 md:p-12 space-y-4`;
export default Register;
