import {
  Badge,
  Box,
  Button,
  Divider,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { collection, getDocs, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import carousel1 from "../Assets/carousel1.png";
import carousel2 from "../Assets/carousel2.png";
import { Link, useNavigate } from "react-router-dom";
import AppCarousel from "../Components/AppCarousel";
import { db } from "../config/firebase";

const HomePage = () => {
  const [products, setProducts] = useState();
  const [courses, setCourses] = useState();
  const carousel = [
    carousel1,
    carousel2,
    "https://asset.kompas.com/crops/Yt7qSA_1px2yqeB2sP-l24AAmVQ=/0x182:1280x822/750x500/data/photo/2020/10/05/5f7ae413191de.jpg",
  ];

  const navigate = useNavigate();

  const getDataCourses = async () => {
    try {
      const q = query(collection(db, "course"));
      const querySnapshot = await getDocs(q);
      const queryData = [];

      querySnapshot.forEach((doc) => {
        let forData = doc.data();
        forData.id = doc.id;
        queryData.push(forData);
      });

      setCourses(queryData);
      // console.log(queryData, "data produk");
    } catch (error) {
      console.log(error, "ini error");
    }
  };

  useEffect(() => {
    getDataCourses();
    // getDataProduct();

    return () => {};
  }, []);

  return (
    <Box
      overflowY={"auto"}
      css={{
        "&::-webkit-scrollbar": {
          width: "0",
        },
      }}
    >
      <AppCarousel images={carousel} />
      <Stack px={4}>
        <Heading size="md" mt={8} align={"center"}>
          Welcome to Beautyology!
        </Heading>
        <Text fontSize={13} align={"center"}>
          Membantu entrepreneur dan professional untuk membangun klinik
          kecantikan yang sukses dengan belajar lewat video dan buku tentang
          langkah-langkah untuk terjun didunia bisnis kecantikan, dengan
          pemateri yang sudah berpengalaman. Jadilah bagian dari pebisnis yang
          sukses dalam klinik kecantikan, daftar kursus video dan beli bukunya
        </Text>
      </Stack>
      {/* <Text
        fontWeight={"bold"}
        fontSize={13}
        ml={3}
        mt={5}
        textTransform={"uppercase"}
      >
        Product Trending
      </Text>
      <Box p={3}>
        <Divider />
      </Box> */}
      {/* <HStack p={5}>
        {products?.length > 0 ? (
          products?.map((x, i) => (
            <Link key={i} to={`/product/${x.id}`}>
              <Box
                boxShadow={"md"}
                borderRadius={"md"}
                overflow={"hidden"}
                // w={"33.3%"}
              >
                <Image w={"10em"} src={x.image} />
                <Text px={2} fontSize={12} fontWeight={"bold"}>
                  {x.name}
                </Text>
                <Badge color={"white"} bg={"red"} fontSize={8}>
                  {x.category.first}
                </Badge>
                <Box p={2}>
                  <Button size={"xs"} w={"full"}>
                    Beli
                  </Button>
                </Box>
              </Box>
            </Link>
          ))
        ) : (
          <Box>No Product Trending</Box>
        )}
      </HStack> */}

      <Text
        fontWeight={"bold"}
        fontSize={13}
        ml={3}
        mt={5}
        textTransform={"uppercase"}
      >
        New Course
      </Text>
      <Box p={3}>
        <Divider />
      </Box>
      <HStack p={5}>
        {courses?.length > 0 ? (
          courses?.map((x, i) => (
            <Link key={i} to={`/course/${x.id}`}>
              <Box boxShadow={"md"} borderRadius={"md"} overflow={"hidden"}>
                <Image src={x.image} align={"center"} />
                <Text
                  px={2}
                  py={3}
                  fontSize={"sm"}
                  align={"center"}
                  fontWeight={"bold"}
                >
                  {x.name}
                </Text>
                <Badge color={"white"} bg={"red"} fontSize={8}>
                  {x.category.first}
                </Badge>
                <Box p={2}>
                  <Button
                    size={"sm"}
                    w={"full"}
                    bg={"brand.900"}
                    color={"white"}
                  >
                    Beli
                  </Button>
                </Box>
              </Box>
            </Link>
          ))
        ) : (
          <Box>No Product Trending</Box>
        )}
      </HStack>
    </Box>
  );
};

export default HomePage;
