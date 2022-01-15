import React from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Authenctication from "./Authenctication"
import Private from "./Private"
const App = () => {
  return (
    <div>
      <Authenctication />
      <Private />
      <ToastContainer />
    </div>

  );
}

export default App;
