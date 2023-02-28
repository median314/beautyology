import {
  Badge,
  Box,
  Button,
  HStack,
  Image,
  Text,
  Toast,
  useToast,
} from "@chakra-ui/react";
import { arrayUnion, doc, getDoc, setDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import { useState } from "react";
import { GrFavorite } from "react-icons/gr";
import { IoArrowBack } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import AppCarousel from "../Components/AppCarousel";
import { db } from "../config/firebase";
import AuthContext from "../Hook/AuthContext";

const ProductBundleSinglePage = () => {
  const carousel = [
    "https://s3-media0.fl.yelpcdn.com/bphoto/T-LiwL9-PDniBnnvO_cr-Q/348s.jpg",
    "https://www.astronauts.id/blog/wp-content/uploads/2022/08/Alasan-Mengapa-Kamu-Harus-Pakai-Skincare-Secara-Rutin-1200x900.jpg",
    "https://asset.kompas.com/crops/Yt7qSA_1px2yqeB2sP-l24AAmVQ=/0x182:1280x822/750x500/data/photo/2020/10/05/5f7ae413191de.jpg",
  ];

  const [bundles, setBundles] = useState();
  const { currentUser, productWishlist, cartList } = useState(AuthContext);

  const param = useParams();
  const toast = useToast();

  const getSingleProduct = async () => {
    try {
      const docRef = doc(db, "bundle", param.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // console.log("Document Data", docSnap.data());
        setBundles(docSnap.data());
      } else {
        console.log("No Document");
      }
    } catch (error) {
      console.log(error, "ini error");
    }
  };

  const handleCart = async () => {
    let cartData = {};
    cartData = { ...bundles };

    try {
      const ref = doc(db, "cart", currentUser.uid);
      await setDoc(
        ref,
        {
          uid: currentUser.uid,
          data: arrayUnion(cartData),
          createdAt: new Date(),
        },
        { merge: true }
      );

      cartData = {};
      // loadingClose();

      toast({
        title: "Beautyology",
        description: "Berhasil menambahkan product ke cart.",
        status: "success",
      });
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
    getSingleProduct();

    return () => {
      setBundles();
    };
  }, []);

  return (
    <>
      <HStack pos={"relative"} p={4} justifyContent={"space-between"}>
        <Link to={"/product"}>
          <Box>
            <IoArrowBack size={"1.3em"} />
          </Box>
        </Link>
        <Box>
          <GrFavorite size={"2em"} />
        </Box>
      </HStack>
      {/* <AppCarousel images={carousel} /> */}
      {bundles ? (
        <Box>
          <Image src={bundles.image} />
          {/* <Text>{product.name}</Text> */}
          <Box px={5}>
            <Text fontWeight={"bold"} textTransform={"uppercase"}>
              {bundles.name}
            </Text>
            <HStack spacing={2} pt={1}>
              <Badge>{bundles.category.first}</Badge>
              <Badge>{bundles.category.second}</Badge>
            </HStack>
            <HStack justifyContent={"space-between"} py={4}>
              <HStack spacing={"none"}>
                <Text fontSize={18}>IDR{bundles.price}</Text>
              </HStack>
              <Badge variant={"outline"} colorScheme="green">
                In Stock
              </Badge>
            </HStack>
          </Box>
          <HStack justify={"center"}>
            <Button size={"sm"} colorScheme={"blue"}>
              Buy
            </Button>
            <Button size={"sm"} colorScheme={"green"}>
              Add To Cart
            </Button>
          </HStack>
        </Box>
      ) : null}
    </>
  );
};

export default ProductBundleSinglePage;
