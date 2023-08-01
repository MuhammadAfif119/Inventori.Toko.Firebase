// import {
//   Box,
//   chakra,
//   Container,
//   Stack,
//   Text,
//   Image,
//   Flex,
//   VStack,
//   Button,
//   Heading,
//   SimpleGrid,
//   StackDivider,
//   useColorModeValue,
//   VisuallyHidden,
//   List,
//   ListItem,
// } from '@chakra-ui/react';
// import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
// import { MdLocalShipping } from 'react-icons/md';
// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import { db } from '../config/firebase'
// import { addDoc, collection, doc, getDoc } from 'firebase/firestore'

// const handleGet = async () => {
//     const docRef = doc(db, "orders", params.id);
//     const docSnap = await getDoc(docRef);

//     if (docSnap.exists()) {
//       console.log("Document data:", docSnap.data());
//       setData(docSnap.data());

//       await addDoc(collection(db, "transactions"), {
//         id: params.id,
//         name: docSnap.data().name,
//         price: docSnap.data().price,
//       });
//     } else {
//       console.log("No such document!");
//     }
//   };

// export const Detail = () => {
//     const [data, setData] = useState();
//     const params = useParams();

//     // Call handleGet to retrieve data
//     useEffect(() => {
//       handleGet();
//     }, []);

//     console.log(data, "ini data");
//   return (
//     <Container maxW={'7xl'}>
//     <SimpleGrid
//       columns={{ base: 1, lg: 2 }}
//       spacing={{ base: 8, md: 10 }}
//       py={{ base: 18, md: 24 }}>
//       <Flex>
//         <Image
//           rounded={"md"}
//           alt={"product image"}
//           src={docSnap.data().Image}
//           fit={"cover"}
//           align={"center"}
//           w={"100%"}
//           h={{ base: "100%", sm: "400px", lg: "500px" }}
//         />
//       </Flex>

//     </SimpleGrid>
//   </Container>
// );
//         }

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  chakra,
  Container,
  Flex,
  Heading,
  Image,
  List,
  ListItem,
  SimpleGrid,
  Stack,
  StackDivider,
  Text,
  Button,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { MdLocalShipping } from "react-icons/md";
import { db } from "../config/firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";

function Detail() {
  const [data, setData] = useState({});
  const params = useParams();

  const handleGet = async () => {
    if (params && params.judul) {
      const docRef = doc(db, "orders", params.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setData(docSnap.data());

        // await addDoc(collection(db, "transactions"), {
        //   id: params.id,
        //   name: docSnap.data().name,
        //   price: docSnap.data().price,
        //   image: docSnap.data().image,
        // });
      } else {
        console.log("No such document!");
      }
    } else {
      console.log("Invalid params or id is missing");
    }
  };

  useEffect(() => {
    handleGet(params, setData);

    const unsubscribe = onSnapshot(collection(db, "orders"), () => {
      handleGet();
    });

    return () => unsubscribe();
  }, []);

  const handleCart = async () => {
    if (data && data.image) {
      await addDoc(collection(db, "transactions"), {
        id: params.id,
        name: data.name,
        price: data.price,
      });
    } else {
      console.log("Invalid image value");
    }
  };

  console.log(data, "ini data");

  return (
    <Container maxW={"7xl"}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}
      >
        <Flex>
          <Image
            rounded={"md"}
            alt={data.image}
            src={data.image} // Access the 'Image' property from the 'data' object
            fit={"cover"}
            align={"center"}
            w={"100%"}
            h={{ base: "100%", sm: "400px", lg: "500px" }}
          />
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={"header"}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
            >
              {data && data.name}
            </Heading>
            <Text
              color={useColorModeValue("gray.900", "gray.400")}
              fontWeight={300}
              fontSize={"2xl"}
            >
              {data && data.price}
            </Text>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={"column"}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.200", "gray.600")}
              />
            }
          >
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text
                color={useColorModeValue("gray.500", "gray.400")}
                fontSize={"2xl"}
                fontWeight={"300"}
              >
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore
              </Text>
              <Text fontSize={"lg"}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
                aliquid amet at delectus doloribus dolorum expedita hic, ipsum
                maxime modi nam officiis porro, quae, quisquam quos
                reprehenderit velit? Natus, totam.
              </Text>
            </VStack>
            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={useColorModeValue("yellow.500", "yellow.300")}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                Features
              </Text>

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                <List spacing={2}>
                  <ListItem>Chronograph</ListItem>
                  <ListItem>Master Chronometer Certified</ListItem>{" "}
                  <ListItem>Tachymeter</ListItem>
                </List>
                <List spacing={2}>
                  <ListItem>Anti‑magnetic</ListItem>
                  <ListItem>Chronometer</ListItem>
                  <ListItem>Small seconds</ListItem>
                </List>
              </SimpleGrid>
            </Box>
            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={useColorModeValue("yellow.500", "yellow.300")}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                Product Details
              </Text>

              <List spacing={2}>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Between lugs:
                  </Text>{" "}
                  20 mm
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Bracelet:
                  </Text>{" "}
                  leather strap
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Case:
                  </Text>{" "}
                  Steel
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Case diameter:
                  </Text>{" "}
                  42 mm
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Dial color:
                  </Text>{" "}
                  Black
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Crystal:
                  </Text>{" "}
                  Domed, scratch‑resistant sapphire crystal with anti‑reflective
                  treatment inside
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Water resistance:
                  </Text>{" "}
                  5 bar (50 metres / 167 feet){" "}
                </ListItem>
              </List>
            </Box>
          </Stack>

          <Button
            onClick={handleCart}
            rounded={"none"}
            w={"full"}
            mt={8}
            size={"lg"}
            py={"7"}
            bg={useColorModeValue("gray.900", "gray.50")}
            color={useColorModeValue("white", "gray.900")}
            textTransform={"uppercase"}
            _hover={{
              transform: "translateY(2px)",
              boxShadow: "lg",
            }}
          >
            Add to cart
          </Button>

          <Stack direction="row" alignItems="center" justifyContent={"center"}>
            <MdLocalShipping />
            <Text>2-3 business days delivery</Text>
          </Stack>
        </Stack>
      </SimpleGrid>
    </Container>
  );
}

export default Detail;
