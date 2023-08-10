import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { validationSchema } from "../../utils/validateForm";
import { attemptLogin } from "../../utils/APIcalls";

export default function Login() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, actions) => {
      // reset form and attempt login
      actions.resetForm();
      attemptLogin();
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
      <Heading>Log In</Heading>
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
          Log In
        </Button>
        <Button onClick={() => navigate("/register")}>Create An Account</Button>
      </ButtonGroup>
    </VStack>
  );
}
