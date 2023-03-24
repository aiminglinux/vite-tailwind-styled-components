import { Fragment } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

// Store:
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './core/store';

// Routes
import AppRoutes from './routes/Routes';

// Global reset CSS
import GlobalReset from './global/GlobalReset';
import Navbar from './Layouts/Navbar/Navbar';

function App() {
  return (
    <Fragment>
      <Router>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <GlobalReset />
            <Navbar />
            <AppRoutes />
          </PersistGate>
        </Provider>
      </Router>
    </Fragment>
  );
}
export default App;
