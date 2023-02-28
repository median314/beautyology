import { Box, Button, Divider, Heading, Text } from "@chakra-ui/react";
import React from "react";

const HelpPage = () => {
  return (
    <Box px={3}>
      <Heading size={"md"} align={"center"} mt={10} mb={3}>
        Help Page.
      </Heading>
      <Text my={3}>
        Lorem ad officia nostrud qui nostrud laboris ut adipisicing. Ea
        incididunt proident exercitation ut nulla Lorem adipisicing et. Est
        proident duis amet commodo fugiat eu eu dolore. Ea ipsum exercitation
        Lorem sit enim est. Est amet anim culpa sit excepteur aliqua esse fugiat
        anim amet cillum Lorem.
      </Text>
      <Text my={3}>
        Lorem ad officia nostrud qui nostrud laboris ut adipisicing. Ea
        incididunt proident exercitation ut nulla Lorem adipisicing et. Est
        proident duis amet commodo fugiat eu eu dolore. Ea ipsum exercitation
        Lorem sit enim est. Est amet anim culpa sit excepteur aliqua esse fugiat
        anim amet cillum Lorem.
      </Text>
      <Divider />
      <Box align={"center"} mt={5}>
        <Button variant={"outline"} colorScheme={"twitter"}>
          Contact Us
        </Button>
      </Box>
    </Box>
  );
};

export default HelpPage;
