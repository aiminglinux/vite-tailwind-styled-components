import { Fragment } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

// Store:
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./core/store";

// Routes
import AppRoutes from "./routes/Routes";

// Global reset CSS
import GlobalReset from "./global/GlobalReset";

function App() {
  return (
    <Fragment>
      <Router>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <GlobalReset />
            <AppRoutes />
          </PersistGate>
        </Provider>
      </Router>
    </Fragment>
  );
}
export default App;
