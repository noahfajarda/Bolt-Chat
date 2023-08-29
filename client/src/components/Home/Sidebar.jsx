import { ChatIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/button";
import {
  Divider,
  HStack,
  Text,
  Heading,
  VStack,
  Circle,
  useDisclosure,
} from "@chakra-ui/react";
import { Tab, TabList } from "@chakra-ui/tabs";
import { useContext } from "react";
import { FriendContext } from "./Home";
import AddFriendModal from "./AddFriendModal";

export default function Sidebar() {
  const { friendList } = useContext(FriendContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      <VStack py="1.4rem">
        <HStack justify="space-evenly" w="100%">
          <Heading size="md">Add Friend</Heading>
          <Button onClick={onOpen}>
            <ChatIcon />
          </Button>
        </HStack>
        <Divider />
        <VStack as={TabList} style={{ borderBottom: "none" }}>
          {friendList.map((friend, idx) => {
            return (
              <HStack as={Tab} key={idx}>
                <Circle
                  bg={friend?.connected ? "green.700" : "red.500"}
                  w="20px"
                  h="20px"
                />
                <Text>{friend?.username}</Text>
              </HStack>
            );
          })}
        </VStack>
      </VStack>
      {/* log out button */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          colorScheme="teal"
          style={{
            position: "relative",
            top: "0px",
            margin: 15,
            marginBottom: 20,
            padding: "1.4rem",
          }}
          onClick={async () => {
            sessionStorage.removeItem("user");
            location.reload();
            window.close();
          }}
        >
          Log Out
        </Button>
      </div>

      <AddFriendModal isOpen={isOpen} onClose={onClose} />
    </div>
  );
}
