import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  Spacer,
  Stack,
  Text,
  Toast,
  useToast,
} from "@chakra-ui/react";
import Logo from "../Assets/Beautyology.png";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../Hook/AuthContext";

const LoginPages = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const toast = useToast();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (email !== "" && password !== "") {
      login(email, password);
      toast({
        title: "Beautyology",
        description: "Login Success",
        status: "success",
      });
    } else {
      toast({
        title: "Beautyology",
        description: "Please input your Email and password.",
        status: "error",
      });
    }
  };

  return (
    <Box px={"10"}>
      <Box mt={20}>
        <Box boxshadow={"md"} align={"center"}>
          <Image w={"15em"} src={Logo} mt={5} />
        </Box>
        <Stack
          justifyContent={"center"}
          px={5}
          // border={"1px"}
          // borderRadius={"md"}
        >
          <Spacer />
          <FormControl py={3}>
            <Text align={"center"} fontWeight={"500"}>
              {" "}
              Please Login
            </Text>
            <FormLabel>Email</FormLabel>
            <Input type={"email"} onChange={(e) => setEmail(e.target.value)} />
            <FormLabel>Password</FormLabel>
            <Input
              type={"password"}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Box py={1} fontSize={13}>
            <Text as={"span"}>Don't have an account? </Text>
            <Text as={"u"}>
              <Link to={"/signup"}>create here</Link>
            </Text>
          </Box>
          <Box>
            <Button w={"full"} onClick={() => handleLogin()}>
              Login
            </Button>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default LoginPages;
