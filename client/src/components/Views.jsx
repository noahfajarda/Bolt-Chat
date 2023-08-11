import React from "react";
import { Route, Routes } from "react-router-dom";
import { Text } from "@chakra-ui/react";
import Login from "./Login/Login";
import Signup from "./Login/Signup";
import PrivateRoutes from "./PrivateRoutes";

export default function Views() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Signup />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/home" element={<Text>Hi welcome home</Text>} />
      </Route>
      <Route path="*" element={<Login />} />
    </Routes>
  );
}
