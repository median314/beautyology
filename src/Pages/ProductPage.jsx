import {
  Badge,
  Box,
  Button,
  Divider,
  HStack,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { collection, doc, getDocs, query } from "firebase/firestore";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../config/firebase";

const BestProductPage = () => {
  const [products, setProducts] = useState();
  const [bundles, setBundles] = useState();

  const getDataProduct = async () => {
    try {
      const q = query(collection(db, "product"));
      const querySnapshot = await getDocs(q);
      const queryData = [];

      querySnapshot.forEach((doc) => {
        let forData = doc.data();
        forData.id = doc.id;
        queryData.push(forData);
      });

      setProducts(queryData);
      // console.log(queryData, "data produk");
    } catch (error) {
      console.log(error, "ini error");
    }
  };

  // const getDataBundle = async () => {
  //   try {
  //     const q = query(collection(db, "bundle"));
  //     const querySnapshot = await getDocs(q);
  //     const queryData = [];

  //     querySnapshot.forEach((doc) => {
  //       let forData = doc.data();
  //       forData.id = doc.id;
  //       queryData.push(forData);
  //     });

  //     setBundles(queryData);
  //     console.log(queryData, "data bundle");
  //   } catch (error) {
  //     console.log(error, "ini error");
  //   }
  // };

  useEffect(() => {
    getDataProduct();
    // getDataBundle();

    return () => {
      setProducts();
      // setBundles();
    };
  }, []);

  return (
    <Box overflow={"auto"}>
      <Box p={2} align={"center"}>
        <Box spacing={2}>
          {bundles?.length > 0
            ? bundles.map((bundle, i) => (
                <Link key={i} to={`/product/bundle/${bundle.id}`}>
                  <Box
                    boxShadow={"md"}
                    borderRadius={"md"}
                    overflow={"hidden"}
                    p={3}
                    w={"80%"}
                  >
                    <Image w={"20em"} src={bundle.image} mb={2} />
                    <HStack justifyContent={"space-between"}>
                      <Text fontSize={16} fontWeight={"bold"}>
                        {bundle.name}
                      </Text>
                      <HStack>
                        <Badge
                          bg={"red"}
                          color={"white"}
                          fontSize={9}
                          borderRadius={3}
                          p={0.5}
                        >
                          {bundle.category.first}
                        </Badge>
                        <Badge
                          bg={"red"}
                          color={"white"}
                          fontSize={9}
                          borderRadius={3}
                          p={0.5}
                        >
                          {bundle.category.second}
                        </Badge>
                      </HStack>
                    </HStack>
                    <Text fontSize={13} py={3}>
                      {bundle.description}
                    </Text>
                    <Box align={"center"}>
                      <Button
                        bg={"brand.100"}
                        w={"20em"}
                        color="white"
                        size={"sm"}
                        mt={1}
                      >
                        Details
                      </Button>
                    </Box>
                  </Box>
                </Link>
              ))
            : null}
        </Box>
        <Divider mt={5} />

        <Stack spacing={3}>
          {products?.length > 0
            ? products.map((product, i) => (
                <Link key={i} to={`/product/${product.id}`}>
                  <Box
                    boxShadow={"md"}
                    borderRadius={"md"}
                    overflow={"hidden"}
                    p={3}
                  >
                    <Image w={"20em"} src={product.image} mb={2} />
                    <Stack justifyContent={"space-between"}>
                      <Text fontSize={14} fontWeight={"bold"}>
                        {product.name}
                      </Text>
                      <HStack justifyContent={"center"}>
                        <Badge
                          bg={"#a18dca"}
                          color={"white"}
                          fontSize={9}
                          borderRadius={3}
                          p={0.5}
                        >
                          {product.category.first}
                        </Badge>
                        <Badge
                          bg={"#a18dca"}
                          color={"white"}
                          fontSize={9}
                          borderRadius={3}
                          p={0.5}
                        >
                          {product.category.second}
                        </Badge>
                      </HStack>
                      <Text fontWeight={"bold"} fontSize={13}>
                        Rp
                        {Intl.NumberFormat("en-ID", {
                          maximumSignificantDigits: 3,
                        }).format(product.price)}
                      </Text>
                    </Stack>
                    <Box align={"center"}>
                      <Button
                        bg={"brand.100"}
                        color="white"
                        size={"xs"}
                        w={"10em"}
                        mt={1}
                      >
                        Details
                      </Button>
                    </Box>
                  </Box>
                </Link>
              ))
            : null}
        </Stack>
      </Box>
    </Box>
  );
};

export default BestProductPage;
