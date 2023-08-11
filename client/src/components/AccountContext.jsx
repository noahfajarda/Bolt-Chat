import { createContext, useState } from "react";

export const AccountContext = createContext();

export const UserContext = ({ children }) => {
  const [user, setUser] = useState({ loggedIn: null });
  return (
    <AccountContext.Provider value={{ user, setUser }}>
      {children}
    </AccountContext.Provider>
  );
};
