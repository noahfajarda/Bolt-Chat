import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { validationSchema } from "../../utils/validateForm";
import { attemptSignup } from "../../utils/APIcalls";
import { useContext, useState } from "react";
import { AccountContext } from "../AccountContext";

export default function Signup() {
  const navigate = useNavigate();
  // retrieve user from context provider
  const { setUser } = useContext(AccountContext);

  const [error, setError] = useState(null);

  // declare formik (form) state to declare & validate values, & handle form submission
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    // validate form
    validationSchema,
    onSubmit: async (values, actions) => {
      // reset form and attempt login
      actions.resetForm();
      attemptSignup(values, navigate, setUser, setError);
    },
  });

  return (
    <VStack
      as="form"
      w={{ base: "90%", md: "500px" }}
      m="auto"
      justify="center"
      h="100vh"
      spacing="1rem"
      onSubmit={formik.handleSubmit}
    >
      <Heading>Sign Up</Heading>
      {/* show 'error' if there is one */}
      <Text as="p" color="red.500">
        {error}
      </Text>
      {/* FormControl == better way to create forms */}
      <FormControl
        isInvalid={formik.errors.username && formik.touched.username}
      >
        <FormLabel fontSize="lg">Username</FormLabel>
        <Input
          name="username"
          placeholder="Enter Username"
          autoComplete="off"
          size="lg"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
      </FormControl>

      <FormControl
        isInvalid={formik.errors.password && formik.touched.password}
      >
        <FormLabel fontSize="lg">Password</FormLabel>
        <Input
          name="password"
          placeholder="Enter Password"
          autoComplete="off"
          size="lg"
          type="password"
          // same as getting value, onchange, onblur
          {...formik.getFieldProps("password")}
        />
        <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
      </FormControl>

      <ButtonGroup pt="1rem">
        <Button
          colorScheme="teal"
          type="submit"
          rightIcon={<ArrowForwardIcon />}
        >
          Create Account
        </Button>
        <Button onClick={() => navigate("/")}>Already Have An Account?</Button>
      </ButtonGroup>
    </VStack>
  );
}
