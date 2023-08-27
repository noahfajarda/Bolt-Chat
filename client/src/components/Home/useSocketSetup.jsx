import { useContext, useEffect } from "react";
import socket from "../../socket";
import { AccountContext } from "../AccountContext";

const useSocketSetup = () => {
  const { setUser } = useContext(AccountContext);
  useEffect(() => {
    // attempt to connect to socket server
    socket.connect();
    // if socket connection fails, set user log in to false
    socket.on("connect_error", () => {
      setUser({ loggedIn: false });
    });
    return () => {
      socket.off("connect_error");
    };
  }, [setUser]);
};

export default useSocketSetup;