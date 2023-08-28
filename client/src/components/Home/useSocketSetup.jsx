import { useContext, useEffect } from "react";
import socket from "../../socket";
import { AccountContext } from "../AccountContext";

const useSocketSetup = (setFriendList, setMessages) => {
  const { setUser } = useContext(AccountContext);
  useEffect(() => {
    // attempt to connect to socket server
    socket.connect();
    socket.on("friends", (friendList) => setFriendList(friendList));
    socket.on("messages", (messages) => setMessages(messages));
    socket.on("dm", (message) => {
      setMessages((prevMsgs) => {
        let match = false;
        prevMsgs.map((oldMessage) => {
          if (oldMessage.id === message.id) {
            match = true;
          }
        });
        if (match) return [...prevMsgs];
        return [message, ...prevMsgs];
      });
    });
    socket.on("connected", (status, username) => {
      setFriendList((prevFriends) => {
        return [...prevFriends].map((friend) => {
          if (friend.username === username) {
            friend.connected = status;
          }
          return friend;
        });
      });
    });
    // if socket connection fails, set user log in to false
    socket.on("connect_error", () => {
      // setUser({ loggedIn: false });
    });
    return () => {
      socket.off("connect_error");
      socket.off("connected");
      socket.off("friends");
      socket.off("messages");
    };
  }, [setUser, setFriendList, setMessages]);
};

export default useSocketSetup;
