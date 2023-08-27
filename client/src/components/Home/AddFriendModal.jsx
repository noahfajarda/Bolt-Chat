import { Modal } from "@chakra-ui/modal";
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  Heading,
} from "@chakra-ui/react";
import TextField from "../TextField";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import socket from "../../socket";
import { useCallback, useContext, useState } from "react";
import { FriendContext } from "./Home";

export default function AddFriendModal({ isOpen, onClose }) {
  const { setFriendList } = useContext(FriendContext);
  const [error, setError] = useState("");

  const friendSchema = Yup.object({
    friendName: Yup.string()
      .required("Username required")
      .min(6, "Invalid username!")
      .max(28, "Invalid username!"),
  });

  // close modal function
  const closeModal = useCallback(() => {
    setError("");
    onClose();
  }, [onClose]);

  // function to trigger event to server & add values
  const attemptToAddFriend = (values) => {
    socket.emit(
      "add_friend",
      values.friendName,
      ({ errorMsg, done, newFriend }) => {
        if (done) {
          setFriendList((prev) => [newFriend, ...prev]);
          closeModal();
          return;
        }
        // show an error
        setError(errorMsg);
      }
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal} isCentered>
      {/* darkens background */}
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add a friend!</ModalHeader>
        <ModalCloseButton />
        <Formik
          initialValues={{ friendName: "" }}
          onSubmit={(values) => attemptToAddFriend(values)}
          validationSchema={friendSchema}
        >
          <Form>
            <ModalBody>
              <Heading fontSize="xl" as="p" color="red.500" textAlign="center">
                {error}
              </Heading>
              <TextField
                label="Friend's name"
                placeholder="Enter friend's username..."
                autoComplete="off"
                name="friendName"
              />
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" type="submit">
                Submit
              </Button>
            </ModalFooter>
          </Form>
        </Formik>
      </ModalContent>
    </Modal>
  );
}
