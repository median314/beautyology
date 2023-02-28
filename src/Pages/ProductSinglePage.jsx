import {
  Badge,
  Box,
  Button,
  Divider,
  Heading,
  HStack,
  Image,
  Text,
  Toast,
  useToast,
} from "@chakra-ui/react";
import { arrayUnion, doc, getDoc, setDoc } from "firebase/firestore";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { Link, useNavigate, useParams } from "react-router-dom";
import AppCarousel from "../Components/AppCarousel";
import { db } from "../config/firebase";
import store from "store";
import AuthContext from "../Hook/AuthContext";
import { GrFavorite } from "react-icons/gr";

const ProductSinglePage = () => {
  const carousel = [
    "https://s3-media0.fl.yelpcdn.com/bphoto/T-LiwL9-PDniBnnvO_cr-Q/348s.jpg",
    "https://www.astronauts.id/blog/wp-content/uploads/2022/08/Alasan-Mengapa-Kamu-Harus-Pakai-Skincare-Secara-Rutin-1200x900.jpg",
    "https://asset.kompas.com/crops/Yt7qSA_1px2yqeB2sP-l24AAmVQ=/0x182:1280x822/750x500/data/photo/2020/10/05/5f7ae413191de.jpg",
  ];

  const [product, setProduct] = useState();

  const param = useParams();
  const navigate = useNavigate();
  const user_data = store.get("user_data");
  const { currentUser } = useContext(AuthContext);
  const toast = useToast();

  const getSingleProduct = async () => {
    try {
      const docRef = doc(db, "product", param.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // console.log("Document Data", docSnap.data());
        setProduct(docSnap.data());
      } else {
        console.log("No Document");
      }
    } catch (error) {
      console.log(error, "ini error");
    }
  };

  //
  const handleCart = async () => {
    let cartData = {};
    cartData = { ...product };

    try {
      const ref = doc(db, "cart", currentUser.uid);
      await setDoc(
        ref,
        {
          uid: currentUser.uid,
          data: arrayUnion({ ...cartData, qty: 1 }),
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

  //wishlist
  const handleWishlist = async () => {
    let firebaseData = {};
    firebaseData = { ...product };

    // loadingShow();

    try {
      const ref = doc(db, "wishlist", currentUser.uid);
      await setDoc(
        ref,
        {
          uid: currentUser.uid,
          data: arrayUnion(firebaseData),
          createdAt: new Date(),
        },
        { merge: true }
      );

      firebaseData = {};
      // loadingClose()

      toast({
        title: "Beautyology",
        description: "Berhasil menambahkan product ke wishlist.",
        status: "success",
      });
    } catch (error) {
      // loadingClose()
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
      setProduct();
    };
  }, []);

  return (
    <Box overflow={"auto"}>
      <HStack pos={"relative"} p={4} justifyContent={"space-between"}>
        <Link to={"/product"}>
          <Box>
            <IoArrowBack size={"1.3em"} />
          </Box>
        </Link>
      </HStack>
      {/* <AppCarousel images={carousel} /> */}
      {product ? (
        <Box>
          <Image src={product.image} align={"center"} />
          {/* <Text>{product.name}</Text> */}
          <Box px={5} mt={3}>
            <HStack justifyContent={"space-between"}>
              <Text fontWeight={"bold"} fontSize={18}>
                Rp
                {Intl.NumberFormat("en-ID", {
                  maximumSignificantDigits: 3,
                }).format(product.price)}
              </Text>
              <Box>
                <GrFavorite
                  cursor={"pointer"}
                  size={"1.4em"}
                  onClick={() => handleWishlist()}
                />
              </Box>
            </HStack>
            <HStack spacing={2} pt={1}>
              <HStack spacing={"none"}>
                <Text fontSize={15}>{product.name}</Text>
              </HStack>
            </HStack>
            <HStack justifyContent={"space-between"} py={4}>
              <HStack fontSize={10}>
                <Badge>{product.category.first}</Badge>
                <Badge>{product.category.second}</Badge>
              </HStack>
              <Badge variant={"outline"} colorScheme="green">
                In Stock
              </Badge>
            </HStack>
          </Box>
          <Box p={2}>
            <Divider />
          </Box>
          <Box p={4}>
            <Heading size={"sm"}>Deskripsi Produk</Heading>
            <Text py={2} fontSize={14}>
              exp date: Jan 2024
            </Text>
            <Text fontSize={14}>
              {" "}
              Helps you to achieve a maximum level of crystal bright skin,
              Improve your skin texture, Strengthen Skin Barrier, Disguise Dark
              Spots, Hyperpigmentation on the skin, Moisturize, Restores
              suppleness, Reduces Redness, Acne-Fighting, Minimizes the
              appearance of dry/damaged skin. Get your #BrightBeautifully skin
              in 4 weeks!
            </Text>
          </Box>
          <Box align={"center"} mb={4} p={3}>
            <Button
              bg={"brand.100"}
              color="white"
              w={"full"}
              size={"sm"}
              onClick={() => handleCart()}
            >
              Add To Cart
            </Button>
          </Box>
        </Box>
      ) : null}
    </Box>
  );
};

export default ProductSinglePage;
