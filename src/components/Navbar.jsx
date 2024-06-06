import { Box, Flex, Heading, Spacer } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <Box bg="teal.500" px={4} py={2} color="white">
      <Flex align="center">
        <Heading as="h1" size="lg">
          Hacker News
        </Heading>
        <Spacer />
      </Flex>
    </Box>
  );
};

export default Navbar;