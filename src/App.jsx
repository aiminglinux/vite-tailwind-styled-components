import { Fragment } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import GlobalReset from "./global/GlobalReset";
import AppRoutes from "./routes/Routes";

function App() {
  return (
    <Fragment>
      <Router>
        <GlobalReset />
        <AppRoutes />
      </Router>
    </Fragment>
  );
}
export default App;
