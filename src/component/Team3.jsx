import { Box, Flex, chakra, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import React from "react";

function Team3() {
  return (
    <Flex
      bg="#edf3f8"
      _dark={{
        bg: "#3e3e3e",
      }}
      p={50}
      w="full"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        w="xs"
        bg="white"
        _dark={{
          bg: "gray.800",
        }}
        shadow="lg"
        rounded="lg"
        overflow="hidden"
        mx="auto"
      >
        <Image
          w="full"
          h={56}
          fit="cover"
          src="https://images.unsplash.com/photo-1623930154261-37f8b293c059?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          alt="avatar"
        />

        <Box py={5} textAlign="center">
          <Link
            to="/our-team"
            display="block"
            fontSize="2xl"
            color="gray.800"
            _dark={{
              color: "white",
            }}
            fontWeight="bold"
          >
             Christian Buehner
          </Link>
          <chakra.span
            fontSize="sm"
            color="gray.700"
            _dark={{
              color: "gray.200",
            }}
          >
            Chief Executive Officer
          </chakra.span>
        </Box>
      </Box>
    </Flex>
  );
}

export default Team3;
