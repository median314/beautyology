import {
  Box,
  Button,
  Divider,
  Heading,
  HStack,
  Image,
  Spacer,
  Stack,
  Text,
  useToast,
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from "@chakra-ui/react";
import { arrayRemove, arrayUnion, doc, setDoc } from "firebase/firestore";
import _ from "lodash";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../config/firebase";
import AuthContext from "../Hook/AuthContext";

const CartPage = () => {
  const [counter, setCounter] = useState();
  const { currentUser, cartList } = useContext(AuthContext);
  // const [price, setPrice] = useState(cartList.data.price);
  const [totalPrice, setTotalPrice] = useState(0);
  const toast = useToast();
  const navigate = useNavigate();
  const { onClose, isOpen, onOpen } = useDisclosure();

  // console.log(cartList, "ini cartList");

  const countTotal = () => {
    // console.log(_.isEmpty(cartList));
    if (_.isEmpty(cartList)) {
      setTotalPrice(0);
    } else {
      let total = 0;
      cartList.data.map((x) => (total += x.price * x.qty));
      setTotalPrice(total);
    }
  };

  const handleFirebase = async (data) => {
    try {
      await setDoc(doc(db, "cart", currentUser.uid), data);
    } catch (error) {
      console.log(error.message, "errorin setdoc cart uid");
    }
  };

  const handleAdd = async (i) => {
    // const data = cartList;
    const newQty = cartList.data[i].qty + 1;
    cartList.data[i].qty = newQty;
    await handleFirebase(cartList);
  };

  const handleMinus = async (i) => {
    // const data = cartList;
    if (cartList.data[i].qty - 1 > 0) {
      const newQty = cartList.data[i].qty - 1;
      cartList.data[i].qty = newQty;
    }
    await handleFirebase(cartList);
  };

  const handleDelete = async (data) => {
    let cartData = {};
    cartData = { ...data };

    try {
      // const ref = doc(db, "cart", currentUser.uid);
      // await setDoc(
      //   ref,
      //   {
      //     uid: currentUser.uid,
      //     data: arrayRemove(cartData),
      //     createdAt: new Date(),
      //   },
      //   { merge: true }
      // );
      // cartData = {};
      // // loadingClose();
      // toast({
      //   title: "Beautyology",
      //   description: "Berhasil menghapus product ke cart.",
      //   status: "success",
      // });
    } catch (error) {
      // loadingClose();
      toast({
        title: "Beautyology",
        description: error.message,
        status: "error",
      });
    }
  };

  useEffect(() => {
    countTotal();

    return () => {};
  }, [cartList]);

  return (
    <Box p={3}>
      <Heading size={"md"} py={2} align={"center"}>
        My Cart
      </Heading>
      <Box px={1} borderRadius={"md"}>
        {cartList?.data?.length > 0 ? (
          <Stack spacing={3} boxShadow={"lg"} p={2} borderRadius={"md"}>
            {cartList?.data?.map((x, i) => (
              <>
                <HStack key={i} justifyContent={"space-between"}>
                  <Image w={"5em"} src={x.image} />
                  <Box w={"60%"} pl={2}>
                    <Text fontWeight="bold" fontSize={14}>
                      {x.name}
                    </Text>
                    <Text fontSize={14}>
                      Rp{" "}
                      {Intl.NumberFormat("en-ID", {
                        maximumSignificantDigits: 3,
                      }).format(x.price)}{" "}
                      /pcs
                    </Text>
                  </Box>

                  <Stack w={"30%"}>
                    {x.category.first !== "Course" ? (
                      <Box align={"center"}>
                        <Text fontSize={14}>Quantity: {x.qty} </Text>
                        <HStack justify={"center"} pt={2}>
                          <Button
                            variant={"outline"}
                            onClick={() => handleMinus(i)}
                            size={"xs"}
                          >
                            -
                          </Button>
                          <Text>{x.qty}</Text>
                          <Button
                            variant={"outline"}
                            onClick={() => handleAdd(i)}
                            size={"xs"}
                          >
                            +
                          </Button>
                        </HStack>
                      </Box>
                    ) : (
                      <Box></Box>
                    )}
                    <Box align={"center"}>
                      <Text
                        as={"i"}
                        fontSize={12}
                        color={"red"}
                        cursor={"pointer"}
                        onClick={() => handleDelete(x)}
                      >
                        Hapus dari cart
                      </Text>
                    </Box>
                  </Stack>
                </HStack>
                <Divider />
              </>
            ))}
          </Stack>
        ) : (
          <Box>No Data</Box>
        )}
      </Box>
      {/* {totalPrice > 0 ? ( */}
      <Box zIndex={1}>
        <Box p={5} boxShadow={"lg"} mt={5} borderRadius={"md"}>
          <Text>Total Belanja</Text>
          <HStack>
            <Spacer />
            <HStack>
              {/* <Text>Total</Text> */}
              <Heading size="sm">
                IDR{" "}
                {totalPrice
                  ? Intl.NumberFormat("en-ID", {
                      maximumSignificantDigits: 3,
                    }).format(totalPrice)
                  : 0}{" "}
              </Heading>
            </HStack>
          </HStack>
          <Divider my={"4"} />
          <Link to={"/checkout"}>
            <Button w={"full"} colorScheme={"telegram"} variant={"outline"}>
              Checkout
            </Button>
          </Link>
        </Box>
      </Box>
      {/* : (<></>) */}
    </Box>
  );
};

export default CartPage;
