import { Badge, Box, Center, Icon, SimpleGrid, Text } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import {
  IoAppsOutline,
  IoCartOutline,
  IoHeartOutline,
  IoHomeOutline,
  IoPersonOutline,
  IoBookOutline,
  IoCreate,
  IoSparklesOutline,
} from "react-icons/io5";
import { BiShoppingBag } from "react-icons/bi";
import { Link } from "react-router-dom";
// import AuthContext from "../Routes/hooks/AuthContext";

const AppBarFooter = () => {
  // const { cartList } = useContext(AuthContext);

  const getCartData = () => {};

  useEffect(() => {
    getCartData();

    return () => {};
  }, []);

  return (
    <Box
      mt={0}
      bgColor="brand.100"
      shadow="base"
      position="sticky"
      bottom={0}
      p="2"
    >
      <SimpleGrid columns={5} textAlign="center" fontSize="sm" color="#03001C">
        <Box>
          <Link to="/">
            <Icon as={IoHomeOutline} boxSize={5} color={"#03001C"} />
            <Text fontSize={12}>Home</Text>
          </Link>
        </Box>
        <Box>
          <Link to="/course">
            <Icon as={IoSparklesOutline} boxSize={5} />
            <Text fontSize={12}>Course</Text>
          </Link>
        </Box>
        <Center>
          <Box
            width="16"
            height="16"
            p="2"
            borderRadius="full"
            mt="-9"
            bgColor="#5086c1"
            color="white"
            shadow="base"
          >
            <Link to="/custom">
              <Icon as={IoCreate} boxSize={6} />
              <Text fontSize={10}>Custom</Text>
            </Link>
          </Box>
        </Center>
        <Box>
          <Link to="/product">
            <Icon as={BiShoppingBag} boxSize={5} />
            <Text fontSize={12}>Products</Text>
          </Link>
        </Box>
        <Box>
          <Link to="/profile">
            <Icon as={IoPersonOutline} boxSize={5} />
            <Text fontSize={12}>Profile</Text>
          </Link>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default AppBarFooter;
