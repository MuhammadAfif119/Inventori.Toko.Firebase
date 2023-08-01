import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Button,
  Text,
  Img,
  Flex,
  Center,
  useColorModeValue,
  HStack,
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
  useToast,
} from "@chakra-ui/react";
import { EditIcon, AddIcon } from "@chakra-ui/icons";
import { BsArrowUpRight, BsHeartFill, BsHeart } from "react-icons/bs";
import { db } from "../../config/firebase";
import {
  doc,
  getDocs,
  deleteDoc,
  collection,
  setDoc,
  updateDoc,
  addDoc,
} from "firebase/firestore";
import { CloseIcon } from "@chakra-ui/icons";
import DrawerExample from "../Button";

const cars = [
  {
    name: "2020 BMW X1 SDRIVE18I XLINE 1.5",
    price: "Rp 653.000.000",
    image:
      "https://b2c-cdn.carsome.id/cdn-cgi/image/format=auto,quality=50,width=1840/B2C/54e3f064-320c-4c49-9696-aedafd30f365.jpg",
  },
  {
    name: "2019 Mercedes-Benz GLC 200 AMG NIGHT EDITION 2.0",
    price: "Rp 901.000.000",
    image:
      "https://b2c-cdn.carsome.id/cdn-cgi/image/format=auto,quality=50,width=1840/B2C/34be6c98-0673-4721-836a-0e2e26c0f1d5.jpg",
  },
  {
    name: "2019 BMW 3 20I (CKD) 2.0",
    price: "Rp 551.000.000",
    image:
      "https://b2c-cdn.carsome.id/cdn-cgi/image/format=auto,quality=50,width=1840/B2C/2e847090-399d-4d49-a386-64431c38831f.jpg",
  },
];

function PostWithLike() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [liked, setLiked] = useState(false);
  const [cards, setCards] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(""); 
  const toast = useToast();

  const getData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "cars"));
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setCards(data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handleOrder = async (car) => {
    try{
      const { name, price, image } = car;
      const docRef = await addDoc(collection(db, "orders"), {
        name: name,
        price: price,
        image: image,
      });
      onClose();
      getData()
      console.log(name,"name", price, "price", image,"gmbr");
      console.log("Document written with ID: ", docRef.id);
    }catch (error){
      console.log("Error deleting document: ", error);
    }
    
  };

  const handleDelete = async (id) => {
    try {
      const docRef = doc(db, "cars", id);
      await deleteDoc(docRef);
      console.log("Document deleted with ID: ", id);
      setCards(cards.filter((car) => car.id !== id)); // Menghapus kartu dari state lokal
    } catch (error) {
      console.log("Error deleting document: ", error);
    }
  };
// di function edit ditambah yupdate data biar bisa update, biar datanya ga jd kosong pad di klik si iconnya
  const handleEdit = async (id, updatedData) => {
    try {
      const docRef = doc(db, "cars", id);
      await updateDoc(docRef, updatedData);
      console.log("Document updated with ID: ", id);

      // Update the local state with the edited data
      setCards((prevCards) =>
        prevCards.map((car) => {
          if (car.id === id) {
            return {
              ...car,
              ...updatedData,
            };
          }
          return car;
        })
      );
      setIsEditMode(false); // Reset edit mode
      setEditId(""); // Reset edit ID
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  return (
    <>
      <div className="buton" style={{ marginTop: "10px", marginLeft: "10px" }}>
        <DrawerExample getData={getData} />
      </div>
      <Flex
       p={5}
       direction="row"
       alignItems="center"
       justifyContent="flex-start">
        {cards.map((car, index) => (
          <Box
            key={index}
            w="xs"
            rounded="sm"
            my={5}
            mx={[0, 5]}
            overflow="hidden"
            bg="white"
            border="1px"
            borderColor="black"
            boxShadow={"6px 6px 0 black"}
          >
            <Box h="200px" borderBottom="1px" borderColor="black">
              <Img
                src={car.image}
                roundedTop="sm"
                objectFit="cover"
                h="full"
                w="full"
                alt="Car Image"
              />
            </Box>
            <Box p={4}>
                <Button 
                colorScheme='teal' 
                size='xs'
                marginBottom="5px"
                onClick={() => handleOrder(car)}
                >
                <AddIcon /> &nbsp;Order
                </Button>
              
              <>

              {/* ini show hide untuk editnya jadi dia bisa edit di dlm card langsung tanpa dilempar kmn2 */}
              {isEditMode && editId === car.id ? (
                <>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Updated Name"
                  />
                  <Input
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Updated Price"
                  />
                  <Input
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="Updated Image URL"
                  />
                  <Button
                    colorScheme="teal"
                    onClick={() =>
                      handleEdit(car.id, {
                        name,
                        price,
                        image,
                      })
                    }
                  >
                    Update Data
                  </Button>
                </>
              ) : (
                // ini edit icon tuh gunanya buat aktifin izin untuk edit trus biar bisa ganti data yang lama jadi yang terbaru
                <EditIcon
                  style={{ marginLeft: "12rem" }}
                  onClick={() => {
                    setIsEditMode(true);
                    setEditId(car.id);
                    setName(car.name);
                    setPrice(car.price);
                    setImage(car.image);
                  }}
                />
              )}


                <Modal
                  initialFocusRef={initialRef}
                  finalFocusRef={finalRef}
                  isOpen={isOpen}
                  onClose={onClose}
                >
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Delete Catalog</ModalHeader>
                    <ModalCloseButton />

                    <ModalFooter>
                      <Button colorScheme="blue" mr={3} onClick={handleDelete}>
                        Delete
                      </Button>
                      <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </>

              <Heading color="black" fontSize="2xl" noOfLines={1}>
                {car.name}
              </Heading>
              <Text color="gray.500" noOfLines={2}>
                {car.price}
              </Text>
            </Box>
            <HStack borderTop="1px" color="black">
              <Flex
                p={4}
                alignItems="center"
                justifyContent="space-between"
                roundedBottom="sm"
                cursor="pointer"
                w="full"
              >
                <Text fontSize="md" fontWeight="semibold">
                  View more
                </Text>
                <Button colorScheme="red" onClick={() => handleDelete(car.id)}>
                  Delete
                </Button>
                <BsArrowUpRight />
              </Flex>
              <Flex
                p={4}
                alignItems="center"
                justifyContent="space-between"
                roundedBottom="sm"
                borderLeft="1px"
                cursor="pointer"
                onClick={() => setLiked(!liked)}
              >
                {liked ? (
                  <BsHeartFill fill="red" fontSize="24px" />
                ) : (
                  <BsHeart fontSize="24px" />
                )}
              </Flex>
            </HStack>
          </Box>
        ))}
      </Flex>
    </>
  );
}

export default PostWithLike;
