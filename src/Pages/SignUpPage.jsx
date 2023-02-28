import {
  FormControl,
  FormLabel,
  Input,
  Spacer,
  useToast,
  Box,
  Stack,
  Button,
  Image,
} from "@chakra-ui/react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import React, { useContext } from "react";
import { useState } from "react";
import { auth, db } from "../config/firebase";
import Logo from "../Assets/Beautyology.png";
import AuthContext from "../Hook/AuthContext";
// import { useUserAuth } from "../Hook/UserAuthContext";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [defaultImage, setDefaultImage] = useState(
    "https://pbs.twimg.com/media/EyyB6cdVEAU807C.png"
  );
  const { signUp } = useContext(AuthContext);
  const toast = useToast();

  const registerData = async () => {
    const displayName = name;
    const photoURL = defaultImage;
    if (
      (email === "" && password === "" && name === "") ||
      password !== confirmPassword
    )
      return toast({
        title: "Something Wrong",
        description: "check your email, password, data",
        status: "error",
        duration: 10000,
        isClosable: true,
        position: "top-end",
      });

    if (email !== "" && password !== "" && name !== "") {
      try {
        signUp(email, password)
          .then(async (userCredential) => {
            await updateProfile(auth.currentUser, {
              displayName,
              photoURL,
            });

            // Signed in
            const user = userCredential.user;
            if (user) {
              toast({
                title: "Success Create",
                description: `Success Create account ${user.displayName}`,
                status: "success",
                duration: 10000,
                isClosable: true,
                position: "top-right",
              });
            }
            await setDoc(doc(db, "users", user.uid), {
              name: name,
              email: user.email,
              image: defaultImage,
              uid_user: user.uid,
              role: "user",
              subscription: "null",
              createdAt: new Date(),
            });
          })

          .catch((error) => {
            toast({
              title: "Something Wrong",
              description: `It looks like you don't have account in your browser, please signup and reload this page / ${error.message}`,
              status: "error",
              duration: 10000,
              isClosable: true,
              position: "top-right",
            });
          });
      } catch (error) {
        toast({
          title: "Something Wrong",
          description: error,
          status: "error",
          duration: 10000,
          isClosable: true,
          position: "top-end",
        });
      }
    } else {
      toast({
        title: "Something Wrong",
        description: "check your data",
        status: "error",
        duration: 10000,
        isClosable: true,
        position: "top-end",
      });
    }
  };
  // let dataUser = {};
  // dataUser.createdAt = new Date();
  // dataUser.name = name;
  // dataUser.email = email;
  // dataUser.username = username;
  // dataUser.password = password;

  // if (password !== confirmPassword) {
  //   toast({
  //     title: "Password does'nt match, try again",
  //     status: "error",
  //     duration: "4000",
  //     isClosable: true,
  //   });
  // } else {
  //   try {
  //     const docSnap = await addDoc(collection(db, "users"), dataUser);
  //     console.log(docSnap);
  //     signUp(email, password);
  //     toast({
  //       title: "Account Created",
  //       status: "success",
  //       duration: "4000",
  //       isClosable: true,
  //     });
  //   } catch (error) {
  //     console.log(error, "ini error");
  //   }
  // }

  return (
    <>
      <Stack justifyContent={"center"} px={20} pt={10}>
        <Box>
          <Image w={"15em"} src={Logo} />
        </Box>
        <Spacer />
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input onChange={(e) => setName(e.target.value)} />
          <FormLabel>Email</FormLabel>
          <Input type={"email"} onChange={(e) => setEmail(e.target.value)} />
          <FormLabel>username</FormLabel>
          <Input onChange={(e) => setUsername(e.target.value)} />
          <FormLabel>Password</FormLabel>
          <Input
            type={"password"}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormLabel>Confirm Password</FormLabel>
          <Input
            type={"password"}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </FormControl>
        <Button onClick={() => registerData()}>Create Account</Button>
      </Stack>
    </>
  );
};

export default SignUpPage;
