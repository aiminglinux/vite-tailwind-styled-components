import { Fragment } from "react";
import tw from "twin.macro";
import Navbar from "./components/Layouts/components/Navbar/Navbar";

// const PrimaryButton = tw.button`bg-blue-800 text-white px-6 py-2 m-6 rounded-md hover:bg-blue-600`;

function App() {
  return (
    <Fragment>
      <Navbar />
      {/* <PrimaryButton> Hello </PrimaryButton> */}
    </Fragment>
  );
}
export default App;
