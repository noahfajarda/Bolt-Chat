import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getLoggedInUserData } from "../utils/APIcalls";

export const AccountContext = createContext();

export const UserContext = ({ children }) => {
  const [user, setUser] = useState({ loggedIn: null });
  const navigate = useNavigate();

  useEffect(() => {
    getLoggedInUserData(setUser, navigate);
  }, []);

  return (
    // allow user to be manipulated and accessed by other components
    <AccountContext.Provider value={{ user, setUser }}>
      {children}
    </AccountContext.Provider>
  );
};
