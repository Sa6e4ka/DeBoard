import {
  Flex,
  Box,
  Button,
  Text,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";

import data from "../../data.json";
import Footer from "../components/Footer";
import Header from "../components/Header";

const ListingFeed = () => {
  const textColor = useColorModeValue("gray.700", "white");

  return (
    <Flex
      direction="column"
      align="center"
      p={5}
      w="100%"
      maxWidth="1200px"
      mx="auto"
      mt="80px" // Добавляем отступ сверху, чтобы лента не перекрывалась хедером
      mb="80px" // Добавляем отступ снизу, чтобы футер не перекрывал ленту
    >
      {data.map((item, index) => (
        <Box
          key={index}
          p={4}
          mb={6}
          w="100%"
          maxW="600px"
          bg="gray.50"
          borderWidth="1px"
          borderRadius="lg"
          boxShadow="md"
        >
          <Text fontWeight="bold" color={textColor} align="center">
            {item.sender}
          </Text>
          <Image
            src={item.image}
            alt={item.name}
            boxSize="100%"
            objectFit="cover"
            borderRadius="md"
            mt={2}
          />
          <Text
            fontSize="lg"
            fontWeight="semibold"
            mt={2}
            color={textColor}
            align="center"
          >
            {item.name}
          </Text>
          <Flex justify="space-between" mt={4}>
            <Button colorScheme="teal" mt={3} size="sm">
              Show Description
            </Button>
            <Button colorScheme="teal" mt={3} size="sm">
              Text Message
            </Button>
          </Flex>
        </Box>
      ))}
    </Flex>
  );
};

const HomePage = () => {
  return (
    <>
      <Header content="Create" route="/create" />
      <ListingFeed />
      <Footer />
    </>
  );
};

export default HomePage;
