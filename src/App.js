import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Home from "./components/home/Home";

function App() {
  const notify = (message) => toast(message);
  const BASEURL = "https://genuinemark.org/piccollect";

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="login"
          element={<Login notify={notify} BASEURL={BASEURL} />}
        />
        <Route path="" element={<Login notify={notify} BASEURL={BASEURL} />} />
        <Route path="register" element={<Register BASEURL={BASEURL} />} />

        <Route
          path="app"
          element={<Home notify={notify} BASEURL={BASEURL} />}
        />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
