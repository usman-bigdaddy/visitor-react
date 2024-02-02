import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../screens/Home";
export default function PublicRoutes() {
  return (
    <Routes>
      <Route index element={<Home />} />
      {/* <Route exact path="/" element={<Login />} /> */}
      {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}
    </Routes>
  );
}
