import {
  Button,
  HStack,
  Box,
  Badge,
  Image,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../Hook/AuthContext";
import store from "store";
import { IoCartOutline } from "react-icons/io5";
import Logo from "../../Assets/Beautyology.png";
import {
  MdFavorite,
  MdOutlineFavorite,
  MdOutlineFavoriteBorder,
} from "react-icons/md";

const AppBarHeader = () => {
  const { currentUser, signOut, cartList, productWishlist } =
    useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

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

  return (
    <>
      <HStack
        bg={"brand.100"}
        color={"#03001C"}
        justifyContent={"space-between"}
        p={"5"}
      >
        <Image w={"9em"} src={Logo} />

        <Box>
          {currentUser?.uid ? (
            <HStack gap={0}>
              <Link to={"/wishlist"}>
                <HStack spacing={0}>
                  <MdOutlineFavoriteBorder size={"1.5em"} />
                  {productWishlist?.data?.length > 0 ? (
                    <Badge
                      bg={"red"}
                      zIndex={1}
                      borderRadius={"full"}
                      color={"white"}
                    >
                      {productWishlist?.data?.length}
                    </Badge>
                  ) : (
                    <></>
                  )}
                </HStack>
              </Link>

              <Link to={"/cart"}>
                <HStack spacing={0}>
                  <IoCartOutline size={"1.5em"} />
                  {cartList?.data?.length > 0 ? (
                    <Box mt={"-2em"}>
                      <Badge
                        bg={"red"}
                        zIndex={1}
                        borderRadius={"full"}
                        color={"white"}
                      >
                        {cartList?.data?.length}
                      </Badge>
                    </Box>
                  ) : (
                    <></>
                  )}
                </HStack>
              </Link>
              <Button
                colorScheme={"yellow"}
                variant={"outline"}
                size={"sm"}
                onClick={onOpen}
              >
                Logout
              </Button>
            </HStack>
          ) : (
            <Link to={"/login"}>
              <Button size={"xs"}>Login</Button>
            </Link>
          )}
        </Box>

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
      </HStack>
    </>
  );
};

export default AppBarHeader;
