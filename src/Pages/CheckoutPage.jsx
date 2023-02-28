import {
  Box,
  Button,
  Center,
  Divider,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  Textarea,
  Toast,
  useDisclosure,
  useToast,
  Radio,
  RadioGroup,
  HStack,
  Image,
} from "@chakra-ui/react";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { calcLength } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import _ from "lodash";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../config/firebase";
import AuthContext from "../Hook/AuthContext";
import AuthProvider from "../Hook/AuthProvider";

const CheckoutPage = () => {
  const [cart, setCart] = useState();
  const [totalPrice, setTotalPrice] = useState();
  const [reduceCart, setReduceCart] = useState();

  const [address, setAddress] = useState();
  const [activeAddress, setActiveAddress] = useState("");

  const [street, setStreet] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [postalcode, setPostalCode] = useState(Number);
  const [phoneNumber, setPhoneNumber] = useState(Number);
  const [receiver, setReceiver] = useState("");

  const {
    onOpen: onAddAddressOpen,
    isOpen: isAddAddressOpen,
    onClose: onAddAddressClose,
  } = useDisclosure();
  const {
    onOpen: onSelectAddressOpen,
    isOpen: isSelectAddressOpen,
    onClose: onSelectAddressClose,
  } = useDisclosure();

  const { currentUser, getDataCart, cartList } = useContext(AuthContext);

  const toast = useToast();
  const navigate = useNavigate();

  console.log(cart, "ini cart");

  const addAddress = async () => {
    try {
      const docRef = collection(db, "users", currentUser.uid, "address");
      await addDoc(
        docRef,
        {
          street: street,
          district: district,
          city: city,
          postalcode: postalcode,
          phoneNumber: phoneNumber,
          receiver: receiver,
          is_active: true,
        },
        { merge: true }
      );

      toast({
        title: "Beautyology",
        description: "New address added",
        status: "success",
      });
    } catch (error) {
      console.log(error, "ini error");
      toast({
        title: "Beautyology",
        description: "New address added",
        status: "error",
      });
    }
  };

  const getAddress = async () => {
    try {
      const q = query(collection(db, "users", currentUser.uid, "address"));
      const querySnapshot = await getDocs(q);
      const queryData = [];

      querySnapshot.forEach((doc) => {
        let forData = doc.data();
        forData.id = doc.id;
        queryData.push(forData);
      });

      setAddress(queryData);

      const dataFind = queryData.find((x) => x.is_active === true);
      setActiveAddress(dataFind);

      // console.log(queryData, "data address");
    } catch (error) {
      console.log(error, "ini error");
    }
  };

  const handleActiveAddress = async (id) => {
    // console.log(id, "ini sesudah");

    try {
      if (activeAddress) {
        const ref = doc(db, "users", currentUser.uid, "address", id);
        await updateDoc(ref, { is_active: true });

        const dataRef = doc(
          db,
          "users",
          currentUser.uid,
          "address",
          activeAddress.id
        );
        await updateDoc(dataRef, { is_active: false });
      }

      toast({
        title: "Beautyology",
        description: "Alamat dipilih",
        status: "success",
      });

      getAddress();
    } catch (error) {
      console.log(error, "ini error");
    }

    // console.log(activeAddress.id, "ini sebelumnya");
  };

  const getCart = async () => {
    try {
      const docRef = doc(db, `cart`, currentUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // console.log("Document Data", docSnap.data());
        setCart(docSnap.data());
      } else {
        console.log("No Document");
      }
    } catch (error) {
      console.log(error, "ini error");
    }
  };

  const countTotal = () => {
    console.log(_.isEmpty(cartList));
    if (_.isEmpty(cartList)) {
      setTotalPrice(0);
    } else {
      let total = 0;
      const deliveryFee = 10000;
      cartList.data.map((x) => (total += x.price * x.qty));
      setTotalPrice(total);
    }
  };

  const addToInvoices = async () => {
    let invoicesData = {};
    invoicesData = { ...activeAddress, ...cart };

    try {
      if (activeAddress) {
        const dataInvoices = collection(db, "invoices");
        await addDoc(dataInvoices, {
          uid: currentUser.uid,
          totalPrice: totalPrice,
          ...activeAddress,
          ...cart,
          paid: false,
        });

        toast({
          title: "Beautyology",
          description: "Checkout Berhasil, mohon lakukan pembayaran",
          statsu: "Success",
        });

        const adminNumber = +6282219481803;
        navigate("/invoice");
      } else {
        toast({
          title: "Beautyology",
          description: "Mohon masukkan alamat",
          statsu: "error",
        });
      }
    } catch (error) {
      console.log(error, "ini error");
    }
  };

  useEffect(() => {
    getAddress();
    getCart();
    countTotal();

    return () => {};
  }, []);

  return (
    <Box overflow={"auto"}>
      <Box p={2} cursor={"pointer"}>
        <Link to={"/cart"}>
          <Text fontSize={14}>{"<"} Back To Cart</Text>
        </Link>
      </Box>
      <Box m={4} borderRadius={"md"} border={"1px"} boxShadow={"md"}>
        <Heading size={"sm"} p={3}>
          Alamat Pengiriman
        </Heading>

        {activeAddress ? (
          <Box>
            <Stack
            // cursor={"pointer"}
            >
              <Box
                border={"1px"}
                p={3}
                m={3}
                borderRadius={"md"}
                boxShadow={"md"}
              >
                <Text fontWeight={"bold"}>Alamat</Text>
                <Text>
                  {activeAddress.street}, {activeAddress.district},{" "}
                  {activeAddress.city}, {activeAddress.postalcode}
                </Text>
                <Divider my={"3"} />
                <Heading size={"xs"}>Informasi Penerima</Heading>
                <Text>{activeAddress.receiver}</Text>
                <Text>{activeAddress.phoneNumber}</Text>
              </Box>
            </Stack>

            <Box align={"center"} my={4}>
              <Button size={"sm"} onClick={onSelectAddressOpen}>
                Ganti Alamat
              </Button>
            </Box>
          </Box>
        ) : (
          <Center mb={2}>
            <Stack>
              <Text>Belum ada alamat</Text>
              <Button size={"sm"} onClick={onSelectAddressOpen}>
                Pilih Alamat
              </Button>
            </Stack>
          </Center>
        )}
      </Box>

      <Box mt={6}>
        <Box px={1} borderRadius={"md"}>
          {cart?.data?.length > 0 ? (
            <Stack
              spacing={3}
              boxShadow={"md"}
              p={2}
              m={3}
              border={"1px"}
              borderRadius={"md"}
            >
              {cart?.data?.map((x, i) => (
                <HStack key={i}>
                  <Image w={"5em"} src={x.image} />
                  <Box>
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
                    <Text fontSize={14}>Quantity: {x.qty} </Text>
                  </Box>
                </HStack>
              ))}
            </Stack>
          ) : (
            <Box>No Product</Box>
          )}
        </Box>
      </Box>

      <Box
        align={"center"}
        border={"1px"}
        mt={6}
        mx={4}
        borderRadius={"md"}
        boxShadow={"md"}
      >
        <Heading py={3} size="md">
          Total Price Details
        </Heading>
        {totalPrice ? (
          <Stack p={4}>
            <HStack justifyContent={"space-between"}>
              <Text>Subtotal</Text>
              <Heading size="sm">
                Rp{" "}
                {totalPrice
                  ? Intl.NumberFormat("en-ID", {
                      maximumSignificantDigits: 3,
                    }).format(totalPrice)
                  : 0}{" "}
              </Heading>
            </HStack>
            <HStack justifyContent={"space-between"}>
              <Text>Delivery Fee </Text>
              <Heading size="sm">
                Rp{" "}
                {Intl.NumberFormat("en-ID", {
                  maximumSignificantDigits: 3,
                }).format(12000)}
              </Heading>
            </HStack>
            <Divider />
            <HStack justifyContent={"space-between"}>
              <Text>Total Fee </Text>
              <Heading size="sm">
                Rp{" "}
                {Intl.NumberFormat("en-ID", {
                  maximumSignificantDigits: 4,
                }).format(totalPrice + 12000)}
              </Heading>
            </HStack>
          </Stack>
        ) : (
          <Box>No product in cart</Box>
        )}
      </Box>

      <Box my={8} mx={3}>
        <a
          href="https://api.whatsapp.com/send?phone=+6282219481803&text=Halo%2C%20saya%20ingin%20memesan%20course%2Fproduk%20yang%20anda%20jual%20ini"
          target="_blank"
        >
          <Button
            bg={"#a18dca"}
            variant={"outline"}
            color={"white"}
            w={"full"}
            onClick={() => addToInvoices()}
          >
            Bayar
          </Button>
        </a>
      </Box>

      <Modal isOpen={isAddAddressOpen} onClose={onAddAddressClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text>Tambah Alamat</Text>
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody>
            <FormLabel>Jalan</FormLabel>
            <Textarea onChange={(e) => setStreet(e.target.value)} />
            <FormLabel>Kecamatan</FormLabel>
            <Input onChange={(e) => setDistrict(e.target.value)} />
            <FormLabel>Kota</FormLabel>
            <Input onChange={(e) => setCity(e.target.value)} />
            <FormLabel>Kode Pos</FormLabel>
            <Input onChange={(e) => setPostalCode(e.target.value)} />
            <FormLabel>Penerima</FormLabel>
            <Input onChange={(e) => setReceiver(e.target.value)} />
            <FormLabel>No. Telp</FormLabel>
            <Input onChange={(e) => setPhoneNumber(e.target.value)} />
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => addAddress()}>Tambah Alamat</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isSelectAddressOpen} onClose={onSelectAddressClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text>Pilih Alamat</Text>
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody>
            {address?.length > 0 ? (
              address?.map((x, i) => (
                <Stack
                  cursor={"pointer"}
                  onClick={() => handleActiveAddress(x.id, i)}
                  // bgColor={x.isActive > 0 ? "gray.100" : "white"}
                  // borderColor={x.is_active > 0 ? "cyan.500" : "white"}
                >
                  <Box
                    border={"1px"}
                    p={3}
                    m={3}
                    borderRadius={"md"}
                    boxShadow={"md"}
                  >
                    <Text fontWeight={"bold"}>Alamat</Text>
                    <Text>
                      {x.street}, {x.district}, {x.city}, {x.postalcode}
                    </Text>
                    <Divider my={"3"} />
                    <Heading size={"xs"}>Informasi Penerima</Heading>
                    <Text>{x.receiver}</Text>
                    <Text>{x.phoneNumber}</Text>
                  </Box>
                </Stack>
              ))
            ) : (
              <Box align={"center"}>
                <Button size={"sm"} onClick={onAddAddressOpen}>
                  Tambah Alamat
                </Button>
              </Box>
            )}
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => onAddAddressOpen()}>Tambah Alamat</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CheckoutPage;
