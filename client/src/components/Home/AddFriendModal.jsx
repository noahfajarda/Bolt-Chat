import { Modal } from "@chakra-ui/modal";
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import TextField from "../TextField";
import { Form, Formik } from "formik";
import * as Yup from "yup";

export default function AddFriendModal({ isOpen, onClose }) {
  const friendSchema = Yup.object({
    friendName: Yup.string()
      .required("Username required")
      .min(6, "Invalid username!")
      .max(28, "Invalid username!"),
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      {/* darkens background */}
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add a friend!</ModalHeader>
        <ModalCloseButton />
        <Formik
          initialValues={{ friendName: "" }}
          onSubmit={(values) => {
            onClose();
          }}
          validationSchema={friendSchema}
        >
          <Form>
            <ModalBody>
              <TextField
                label="friend's name"
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
