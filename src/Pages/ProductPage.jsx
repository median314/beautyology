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
    <Box
      overflow={"auto"}
      css={{
        "&::-webkit-scrollbar": {
          width: "0",
        },
      }}
    >
      <Box p={2} align={"center"}>
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
                    <Image src={product.image} mb={2} />
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
                        bg={"brand.900"}
                        color="white"
                        size={"sm"}
                        w={"80%"}
                        mt={1}
                        borderRadius={"sm"}
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
