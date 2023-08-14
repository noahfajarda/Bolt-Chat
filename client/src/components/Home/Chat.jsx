import { TabPanel, TabPanels, VStack } from "@chakra-ui/react";
import { useContext } from "react";
import { FriendContext } from "./Home";

export default function Chat() {
  const { friendList } = useContext(FriendContext);
  return friendList.length > 0 ? (
    <VStack>
      <TabPanels>
        <TabPanel>Friend one</TabPanel>
        <TabPanel>Friend Two</TabPanel>
      </TabPanels>
    </VStack>
  ) : (
    <VStack>
      <TabPanels
        justify="center"
        pt="5rem"
        w="100%"
        textAlign="center"
        fontSize="lg"
      >
        <TabPanel>No Friends :( Click add friend to start chatting</TabPanel>
      </TabPanels>
    </VStack>
  );
}
