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
import * as Yup from "yup";

export default function Signup() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required("Username required!")
        .min(6, "Username too short!")
        .max(28, "Username too long!"),
      password: Yup.string()
        .required("Password required!")
        .min(6, "Password too short!")
        .max(28, "Password too long!"),
    }),
    onSubmit: (values, actions) => {
      const vals = { ...values };
      alert(JSON.stringify(values, null, 2));
      actions.resetForm();
      fetch("http://localhost:3000/auth/register", {
        method: "POST",
        credentials: "include",
        header: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(vals),
      })
        .catch((err) => {
          return err;
        })
        .then((res) => {
          if (!res || !res.ok || res.status >= 400) {
            return;
          }
          return res.json();
        })
        .then((data) => {
          if (!data) return;
          console.log(data);
        });
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
