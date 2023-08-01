import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Heading,
  Button,
  Text,
  Image,
  Flex,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalContent,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { useNavigate, useParams } from "react-router-dom";

function InitialFocus() {
  const [cards, setCards] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [invoice, setInvoice] = useState("");
  const initialRef = useRef();
  const navigate = useNavigate();

  // const handleSave = async (car) => {
  //   try {
  //     const car = {
  //       name: name,
  //       price: price,
  //     };

  //     const docRef = await addDoc(collection(db, "invoice"), {
  //       id: "CR" + invoice,
  //       name: name,
  //       price: price,
  //     });

  //     onClose();
  //     getData();
  //     console.log(invoice, name, "name", price, "price", image, "gmbr");
  //     console.log("Document written with ID: ", docRef.id);

  //     // Reset form values
  //     setName("");
  //     setPrice("");
  //     setImage("");
  //     setInvoice("");
  //   } catch (error) {
  //     console.log("Error saving document: ", error);
  //   }
  // };

  const handleDelete = async (id) => {
    try {
      const docRef = doc(db, "orders", id);
      await deleteDoc(docRef);
      console.log("Document deleted with ID: ", id);
      setCards((prevCards) => prevCards.filter((car) => car.id !== id));
    } catch (error) {
      console.log("Error deleting document: ", error);
    }
  };

  const getData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "orders"));
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setCards(data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    getData();

    const unsubscribe = onSnapshot(collection(db, "orders"), () => {
      getData();
    });

    return () => unsubscribe();
  }, []);

  // const handleSubmit = async (car) => {

  //   try {
  //     const car = {
  //       name: name,
  //       price: price,
  //     };

  //     const docRef = await addDoc(collection(db, "transactions"), {
  //       id: "CR" + invoice,
  //       ...car,
  //     });

  //     onClose();
  //     getData();
  //     console.log(invoice, name, "name", price, "price", image, "gmbr");
  //     console.log("Document written with ID: ", docRef.id);

  //     // Reset form values
  //     setName("");
  //     setPrice("");
  //     setImage("");
  //     setInvoice("");
  //   } catch (error) {
  //     console.log("Error saving document: ", error);
  //   }
  // }
  return (
    <>
      <Box p={5}>
        <Flex wrap="wrap" justifyContent="space-between">
          {cards.map((car, index) => (
            <Flex
              key={car.id}
              p={3}
              direction="row"
              alignItems="center"
              justifyContent="flex-start"
            >
              <Box maxW="xs" mx="auto" bg="white" shadow="lg" rounded="lg">
                <Box px={4} py={2}>
                  <Button onClick={() => handleDelete(car.id)}>
                    <CloseIcon />
                  </Button>
                  <Heading
                    color="gray.800"
                    fontWeight="bold"
                    fontSize="3xl"
                    textTransform="uppercase"
                  >
                    {car.name}
                  </Heading>
                </Box>

                <Image h={48} w="full" fit="cover" mt={2} src={car.image} />

                <Flex
                  alignItems="center"
                  justifyContent="space-between"
                  px={4}
                  py={2}
                  bg="gray.900"
                  roundedBottom="lg"
                >
                  <Heading color="white" fontWeight="bold" fontSize="lg">
                    {car.price}
                  </Heading>
                  <Button onClick={() => navigate(`/detail/${car.id}`)}>
                    View More
                  </Button>
                </Flex>
              </Box>
            </Flex>
          ))}
        </Flex>
      </Box>
      {/* 
      <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={initialRef}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Invoice ID</FormLabel>
                <Input
                  placeholder="Enter ID"
                  value={invoice}
                  onChange={(e) => setInvoice(e.target.value)}
                  ref={initialRef}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} type="submit" onClick={handleSave}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal> */}
    </>
  );
}

export default InitialFocus;
