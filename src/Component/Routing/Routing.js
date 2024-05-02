import React from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Header from "../Layout/Header/Header";
import Registration from "../Registration/Registration";
import Login from "../Auth/Login";
import Profile from "../Auth/Profile";


const Routing = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="" element={<Registration />} />
        <Route path="loginpage" element={<Login />} />
        <Route path="loginpage/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default Routing;
