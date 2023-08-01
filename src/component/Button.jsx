import React, { useState } from "react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormLabel,
  Input,
  Stack,
  Box,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { collection, addDoc} from "firebase/firestore"; 
import { db } from "../config/firebase";

function DrawerExample(props) {
  const {getData} = props
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [cards, setCards] = useState([]);

  const addData = async () => {
    const docRef = await addDoc(collection(db, "cars"), {
      name: name,
      price: price,
      image: image
    });
    onClose();
    getData()

    console.log("Document written with ID: ", docRef.id);
  };

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const handleSubmit = () => {
    try {
      // Reset input values
      console.log(name, 'nama', price, 'harga', image, 'gambar');
      // onClose(); // Close the drawer after submission
    } catch (error) {
      // Handle any errors that occur during form submission
      console.error(error);
    }
  };
  
  return (
    <>
      <Button leftIcon={<AddIcon />} colorScheme="teal" onClick={onOpen}>
        Add Catalog
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Add New Catalog</DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <Box>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input
                  id="name"
                  placeholder="Please enter product name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel htmlFor="price">Price</FormLabel>
                <Input
                  id="price"
                  placeholder="Please enter price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel htmlFor="image">Image Address</FormLabel>
                <Input
                  id="image"
                  placeholder="Please enter URL"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
              </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={addData}>
              Submit
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default DrawerExample;
