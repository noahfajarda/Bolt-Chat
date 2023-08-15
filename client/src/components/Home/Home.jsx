import { Grid, GridItem, Tabs } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import { createContext, useState } from "react";
import useSocketSetup from "./useSocketSetup";

export const FriendContext = createContext();

export default function Home() {
  const [friendList, setFriendList] = useState([
    { username: "John Doe", connected: false },
    { username: "Stevjen", connected: true },
    { username: "Steven", connected: true },
  ]);
  useSocketSetup();

  return (
    <FriendContext.Provider value={{ friendList, setFriendList }}>
      {/* // 10 column, 1 repeat */}
      <Grid templateColumns="repeat(10, 1fr)" h="100vh" as={Tabs}>
        {/* takes 3 columns of 10 */}
        <GridItem colSpan="3" borderRight="1px solid gray">
          <Sidebar />
        </GridItem>
        <GridItem colSpan="7">
          <Chat />
        </GridItem>
      </Grid>
    </FriendContext.Provider>
  );
}
