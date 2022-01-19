// import logo from './logo.svg';
// import ROUTES, { RenderRoutes } from "./routes";
import './App.css';
import Apploader from 'AppLoader';

import { UserStateProvider } from 'store/userStore';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

// ** toast
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ToastContainer />
      <UserStateProvider>
        {/* <RenderRoutes routes={ROUTES} /> */}
        <Apploader />
      </UserStateProvider>
      </LocalizationProvider>
    </div>
  );
}

export default App;
