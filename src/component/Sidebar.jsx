import React, { ReactNode } from 'react';
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
} from '@chakra-ui/react';
import { UnlockIcon } from '@chakra-ui/icons';
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
} from 'react-icons/fi';
import { IconType } from 'react-icons';
import { ReactText } from 'react';
import { useNavigate } from 'react-router-dom';

interface LinkItemProps {
  name: string;
  icon: IconType;
  onClick?: () => void; // Add onClick option
}

const SidebarContent = ({ onCloseSidebar, ...rest }: SidebarContentProps) => {
  const navigate = useNavigate();

  const handleCatalog = async () => {
    try {
      navigate('/catalog');
    } catch (error) {
      console.error(error);
    }
  };

  const handleOrder = async () => {
    try {
      navigate('/order');
    } catch (error) {
      console.error(error);
    }
  };

  const handleInvoice = async () => {
    try {
      navigate('/invoice');
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleMeetOurTeam = async () => {
    try {
      navigate('/our-team');
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogOut = async () => {
    try {
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  const LinkItems: Array<LinkItemProps> = [
    { name: 'Catalog', icon: FiHome, onClick: handleCatalog },
    { name: 'Orders', icon: FiTrendingUp, onClick: handleOrder },
    { name: 'Invoice', icon: FiCompass, onClick: handleInvoice },
    { name: 'Meet Our Team', icon: FiStar, onClick: handleMeetOurTeam },
    { name: 'Log Out', icon: UnlockIcon, onClick: handleLogOut},
  ];

  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Dashboard
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onCloseSidebar} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} onClick={link.onClick}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

interface SidebarProps extends BoxProps {
  onCloseSidebar: () => void;
}

const Sidebar = ({ onCloseSidebar, ...rest }: SidebarProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent onCloseSidebar={onCloseSidebar} display={{ base: 'none', md: 'block' }} />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onCloseSidebar={onCloseSidebar} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {rest.children}
      </Box>
    </Box>
  );
};

interface SidebarContentProps extends SidebarProps {}

const NavItem = ({ icon, children, onClick, ...rest }: NavItemProps) => {
  return (
    <Link href="#" textDecoration="none">
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="md"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        onClick={onClick}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
  onClick?: () => void; // Add onClick option
}

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
        Dashboard
      </Text>
    </Flex>
  );
};

export default Sidebar;
