import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  useColorModeValue,
} from '@chakra-ui/react';
import { db } from '../config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { BsBoxArrowUpRight } from 'react-icons/bs';
import { AiFillEdit } from 'react-icons/ai';
import { BsFillTrashFill } from 'react-icons/bs';

const Invoice = () => {
  const [cards, setCards] = useState([]);

  const getData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'transactions'));
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setCards(data);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const color1 = useColorModeValue('gray.400', 'gray.400');
  const color2 = useColorModeValue('gray.400', 'gray.400');

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Invoice ID</Th>
            <Th>Name</Th>
            <Th>Price</Th>
          </Tr>
        </Thead>
        <Tbody>
          {cards.map((card, index) => (
            <Tr key={card.id}>
              <Td>{card.id}</Td>
              <Td>{card.name}</Td>
              <Td>{card.price}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default Invoice;
