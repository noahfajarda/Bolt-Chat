import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { Text } from "@chakra-ui/react";
import Login from "./Login/Login";
import Signup from "./Login/Signup";
import PrivateRoutes from "./PrivateRoutes";
import { AccountContext } from "./AccountContext";

// pages for application
export default function Views() {
  const { user } = useContext(AccountContext);

  // check for 'user.logged' existance
  return user.logged === null ? (
    <Text>Loading...</Text>
  ) : (
    <Routes>
      {/* normal routes */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Signup />} />
      {/* protected routes */}
      <Route element={<PrivateRoutes />}>
        <Route path="/home" element={<Text>Hi welcome home</Text>} />
      </Route>
      {/* rest of routes */}
      <Route path="*" element={<Login />} />
    </Routes>
  );
}
