import tw from "twin.macro";
import Button from "../Button/Button";

function Register() {
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
        <Button isFull>Register</Button>
      </Inner>
    </Wrapper>
  );
}

const Wrapper = tw.section`w-[640px] h-[500px] bg-white rounded-md border border-solid mx-auto`;
const Inner = tw.div`p-12`;

export default Register;
