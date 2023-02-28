import {
  Box,
  Button,
  Divider,
  HStack,
  Image,
  Spinner,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import AuthContext from "../Hook/AuthContext";
import { arrayRemove, doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";

const WishlistPage = () => {
  const { currentUser, productWishlist } = useContext(AuthContext);
  const toast = useToast();
  const navigate = useNavigate();

  // console.log(productWishlist, "ini product");

  const handleDelete = async (item) => {
    let firebaseData = {};
    firebaseData = { ...item };
    // console.log(firebaseData, "ini data");

    try {
      const ref = doc(db, "wishlist", currentUser.uid);
      await setDoc(
        ref,
        {
          uid: currentUser.uid,
          data: arrayRemove(firebaseData),
          createdAt: new Date(),
        },
        { merge: true }
      );

      firebaseData = {};
      toast({
        title: "Beautyology",
        description: "Berhasil menghapus produk dari wishlist.",
        status: "success",
      });
    } catch (error) {
      toast({
        title: "Beautyology",
        description: error.message,
        status: "error",
      });
    }
  };

  return (
    <Box px={5}>
      <Text mb={4} align={"center"} fontWeight={"bold"}>
        {" "}
        Your Wishlist{" "}
      </Text>
      <Divider mb={3} />
      {productWishlist?.data?.length > 0 ? (
        <Stack gap={5}>
          {productWishlist?.data?.map((x, i) => (
            <HStack
              shadow="md"
              key={i}
              borderRadius={"xl"}
              spacing={2}
              p={2}
              bgColor="white"
            >
              <Stack alignItems={"center"}>
                <Image w={"7em"} src={x.image} alt="img" borderRadius={"md"} />
              </Stack>
              <Stack>
                <Stack px={3} spacing={"none"}>
                  <Text
                    textTransform={"capitalize"}
                    fontWeight="bold"
                    fontSize={"sm"}
                    // noOfLines={2}
                  >
                    {" "}
                    {x.name}
                  </Text>
                  <Stack>
                    <Text
                      as={"span"}
                      fontWeight="bold"
                      color={"gray.00"}
                      fontSize={"sm"}
                    >
                      Rp{" "}
                      {x.price
                        ? Intl.NumberFormat("en-ID", {
                            maximumSignificantDigits: 3,
                          }).format(x.price)
                        : 0}
                    </Text>
                  </Stack>
                </Stack>

                <HStack p={3} alignItems={"center"} spacing={3}>
                  <Button size={"sm"} bgColor="green.400" color={"white"}>
                    Add To Cart
                  </Button>
                  <Stack cursor={"pointer"}>
                    <AiOutlineDelete
                      style={{ fontSize: 20, color: "red" }}
                      onClick={() => handleDelete(x)}
                    />
                  </Stack>
                </HStack>
              </Stack>
            </HStack>
          ))}
        </Stack>
      ) : (
        <Stack h={"70vh"} alignItems="center" justifyContent={"center"}>
          <Text>No Wishlist</Text>
        </Stack>
      )}
    </Box>
  );
};

export default WishlistPage;
