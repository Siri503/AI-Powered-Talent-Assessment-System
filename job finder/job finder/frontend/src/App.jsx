import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AllJobs from "./pages/user/AllJobs";
import Home from "./pages/user/Home";
import CreateJob from "./pages/hr/CreateJob";
import Profile from "./pages/hr/Profile";
import TestPage from "./pages/user/TestPage";
import Interviews from "./pages/hr/Interviews";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/allJobs" element={<AllJobs />} />
          <Route path="/post" element={<CreateJob />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/interviews" element={<Interviews />} />
          <Route path="/test" element={<TestPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
