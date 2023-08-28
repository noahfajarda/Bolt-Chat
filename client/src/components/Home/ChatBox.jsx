import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { HStack } from "@chakra-ui/layout";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import socket from "../../socket";
import { useContext } from "react";
import { MessagesContext } from "./Home";
import { v4 as uuidv4 } from "uuid";

export default function ChatBox({ userid }) {
  const { setMessages } = useContext(MessagesContext);
  return (
    <Formik
      initialValues={{ message: "" }}
      validationSchema={Yup.object({
        message: Yup.string().min(1).max(225),
      })}
      onSubmit={(values, actions) => {
        if (values.message.length == 0) return;
        const message = {
          id: uuidv4(),
          to: userid,
          from: null,
          content: values.message,
        };
        socket.emit("dm", message);
        setMessages((prevMsgs) => [message, ...prevMsgs]);
        actions.resetForm();
      }}
    >
      <HStack as={Form} w="100%" p="1.4rem">
        <Input
          as={Field}
          name="message"
          placeholder="Type message here..."
          size="lg"
          autoComplete="off"
        />
        <Button type="submit" size="lg" colorScheme="teal">
          Send
        </Button>
      </HStack>
    </Formik>
  );
}
