import { ChatIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/button";
import {
  Divider,
  HStack,
  Text,
  Heading,
  VStack,
  Circle,
} from "@chakra-ui/react";
import { Tab, TabList } from "@chakra-ui/tabs";
import { useContext } from "react";
import { FriendContext } from "./Home";

export default function Sidebar() {
  const { friendList, setFriendList } = useContext(FriendContext);

  return (
    <VStack py="1.4rem">
      <HStack justify="space-evenly" w="100%">
        <Heading size="md">Add Friend</Heading>
        <Button>
          <ChatIcon />
        </Button>
      </HStack>
      <Divider />
      <VStack as={TabList}>
        {friendList.map((friend) => (
          <HStack as={Tab} key={friend?.username}>
            <Circle
              bg={friend.connected ? "green.700" : "red.500"}
              w="20px"
              h="20px"
            />
            <Text>{friend.username}</Text>
          </HStack>
        ))}
      </VStack>
    </VStack>
  );
}
