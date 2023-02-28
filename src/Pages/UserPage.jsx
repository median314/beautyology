import {
  Badge,
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { collection, doc, getDocs, query } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import {
  IoHelp,
  IoHelpCircle,
  IoList,
  IoLogOut,
  IoNewspaper,
  IoPricetag,
} from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../config/firebase";
import { MdFavorite } from "react-icons/md";
import AuthContext from "../Hook/AuthContext";
import store from "store";

const UserPage = () => {
  const { currentUser, productWishlist, signOut } = useContext(AuthContext);
  // console.log(currentUser);
  const [users, setUsers] = useState("");
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleLogout = () => {
    signOut()
      .then(() => {
        navigate("/", { replace: true });
        store.clearAll();
      })
      .catch((error) => {
        console.log(error, "ini error");
      });
  };

  const getDataUser = async () => {
    try {
      const q = query(collection(db, "users"));
      const querySnapshot = await getDocs(q);
      const queryData = [];

      querySnapshot.forEach((doc) => {
        let forData = doc.data();
        forData.id = doc.id;
        queryData.push(forData);
      });

      setUsers(queryData);
      // console.log(queryData, "data produk");
    } catch (error) {
      console.log(error, "ini error");
    }
  };

  useEffect(() => {
    getDataUser();

    return () => {
      setUsers();
    };
  }, []);

  return (
    <Stack py={10} overflow={"auto"}>
      {currentUser ? (
        <Box>
          <Center overflow={"auto"}>
            {/* <Box w={200} h={200} border={"1px"} align={"center"}>
              {" "}
              For Image
            </Box> */}
            <Image w={"12em"} src={currentUser?.photoURL} />
          </Center>
          <Box>
            <Text fontWeight={"bold"} fontSize={20} align={"center"} mt={5}>
              User Details
            </Text>
            <Text align={"center"} fontSize={18}>
              {currentUser.displayName}
            </Text>
            <Text align={"center"}>{currentUser.email}</Text>
          </Box>
        </Box>
      ) : null}

      <Spacer />

      <Stack spacing={3}>
        <Link to={"/wishlist"}>
          <HStack p={3} bg={"#f2f6ff"} boxShadow={"md"}>
            <MdFavorite size={"1.5em"} />
            <Text>Wishlists</Text>
            <Badge bg={"red"} borderRadius={"full"} color={"white"}>
              {productWishlist?.data?.length}
            </Badge>
          </HStack>
        </Link>
        <Link to={"/order"}>
          <HStack p={3} bg={"#f2f6ff"} boxShadow={"md"}>
            <IoPricetag size={"1.5em"} />
            <Text>Your Order</Text>
          </HStack>
        </Link>
        <Link to={"/invoice"}>
          <HStack p={3} bg={"#f2f6ff"} boxShadow={"md"}>
            <IoList size={"1.5em"} />
            <Text>Invoices</Text>
          </HStack>
        </Link>
        <HStack p={3} bg={"#f2f6ff"} boxShadow={"md"}>
          <IoHelpCircle size={"1.5em"} />
          <Text>Help</Text>
        </HStack>
        <HStack
          p={3}
          bg={"#f2f6ff"}
          boxShadow={"md"}
          onClick={onOpen}
          cursor={"pointer"}
        >
          <IoLogOut size={"1.5em"} />
          <Text>Logout</Text>
        </HStack>
      </Stack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Logout From Account</ModalHeader>
          <ModalBody fontWeight={"semibold"}>
            You will logout from the app, are you sure?
          </ModalBody>
          <ModalFooter>
            <HStack gap={2}>
              <Button
                w={"5em"}
                colorScheme={"red"}
                onClick={() => handleLogout()}
              >
                Yes
              </Button>
              <Button w={"5em"} colorScheme={"green"} onClick={onClose}>
                No
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Stack>
  );
};

export default UserPage;
