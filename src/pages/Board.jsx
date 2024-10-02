import {
  Flex,
  Box,
  Button,
  Text,
  Image,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useActiveAccount, useActiveWalletChain } from "thirdweb/react";

import getAdds from "../getAdds";
import Footer from "../components/Footer";
import Header from "../components/Header";
import InitialContract from "../contract";

const ListingFeed = () => {
  const [contractData, setContractData] = useState([]); // Данные контракта
  const [loading, setLoading] = useState(true); // Состояние загрузки
  const [error, setError] = useState(null); // Состояние ошибки
  const textColor = useColorModeValue("gray.700", "white");

  const navigate = useNavigate();

  const activeAccount = useActiveAccount();
  const activeChain = useActiveWalletChain();

  // Модальное окно
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedDescription, setSelectedDescription] = useState("");

  const handleShowDescription = (description) => {
    setSelectedDescription(description);
    onOpen();
  };

  useEffect(() => {
    if (!activeAccount || !activeChain) {
      navigate("/error");
    }
  }, [activeAccount, activeChain, navigate]);

  useEffect(() => {
    const fetchContractData = async () => {
      try {
        const contract = InitialContract(activeAccount, activeChain)[0];

        if (!contract) {
          throw new Error("Контракт не инициализирован");
        }

        const data = await getAdds(contract);
        console.log(data);
        setContractData(data);
      } catch (err) {
        console.error("Ошибка при загрузке данных контракта:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContractData(); // Вызов функции для получения данных контракта
  }, []); // Добавляем зависимость от контракта, чтобы следить за его инициализацией

  if (loading) {
    return <Text>Loading...</Text>; // Пока данные загружаются
  }

  if (error) {
    return <Text color="red.500">Ошибка: {error}</Text>; // Отображение ошибки, если есть
  }

  return (
    <>
      <Flex
        direction="column"
        align="center"
        p={5}
        w="100%"
        maxWidth="1200px"
        mx="auto"
        mt="80px"
        mb="80px"
      >
        {contractData.length > 0 ? (
          contractData
            .slice() // Создаем копию массива, чтобы не изменять оригинальный
            .reverse() // Применяем метод reverse()
            .map((item, index) => (
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
                  alt={item.tittle}
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
                  {item.tittle}
                </Text>
                <Text fontSize="md" mt={2} color={textColor} align="center">
                  Price: {Number(item.price) / 1e18} ETH
                </Text>
                <Flex justify="space-between" mt={4}>
                  <Button
                    colorScheme="teal"
                    mt={3}
                    size="sm"
                    onClick={() => handleShowDescription(item.description)}
                  >
                    Show Description
                  </Button>
                  <Button colorScheme="teal" mt={3} size="sm">
                    Text Message
                  </Button>
                </Flex>
              </Box>
            ))
        ) : (
          <Text>Нет данных для отображения.</Text>
        )}
      </Flex>

      {/* Модальное окно для описания */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent
          w={{ base: "90%", md: "70%", lg: "50%" }} // Адаптивная ширина модального окна
          maxW="600px"
        >
          <ModalHeader>Description</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize={{ base: "sm", md: "md", lg: "lg" }}>
              {selectedDescription}
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
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
