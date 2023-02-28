import { Box, Button, HStack, Image, Stack, Text } from "@chakra-ui/react";
import React from "react";

const OrderPage = () => {
  return (
    <Stack p={3} spacing={5}>
      <Box align={"center"}>
        <Text fontSize={20}>Orders</Text>
      </Box>
      <HStack
        justify={"space-between"}
        bgColor={"whiteSmoke"}
        borderRadius={"md"}
        px={10}
        py={5}
        boxShadow={"md"}
      >
        <Box>
          <Text>Subtotal</Text>
          <Text>Tax</Text>
          <Text>Delivery</Text>
        </Box>
        <Box color={"blackAlpha.700"}>
          <Text>2500000</Text>
          <Text>3000</Text>
          <Text>Free</Text>
        </Box>
      </HStack>
      <HStack
        bg={"whitesmoke"}
        p={5}
        borderRadius={"md"}
        boxShadow={"md"}
        spacing={5}
      >
        <Image
          w={"5em"}
          src="https://media.allure.com/photos/61eafcb35b39dc575baf661b/1:1/w_2300,h_2300,c_limit/The%20Ordinary%20Niacinamide%2010%25%20+%20Zinc%201%25%20Oil%20Control%20Serum.jpg"
        />
        <Box>
          <Text fontSize={15}>Serum Pemecah Keheningan</Text>
          <Box py={2}>
            <Text fontSize={14}>Total : 1</Text>
            <Text fontSize={14}>IDR10000</Text>
          </Box>
        </Box>
      </HStack>
      <Button colorScheme={"blue"}>Pay</Button>
    </Stack>
  );
};

export default OrderPage;
