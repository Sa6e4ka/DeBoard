import { Flex, Button, useColorModeValue } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const bg = useColorModeValue("gray.100", "gray.800");
  const navigate = useNavigate();
  return (
    <Flex
      as="footer"
      p={{ base: "10px", md: "20px" }}
      bg={bg}
      justify="center"
      align="center"
      position="fixed" // Закрепляем футер
      bottom="0" // Прикрепляем к нижней части страницы
      left="0"
      right="0"
      zIndex="1000"
      boxShadow="md"
    >
      <Button
        colorScheme="teal"
        size={{ base: "lg", md: "md" }}
        onClick={() => navigate("/messenger")}
      >
        Messenger
      </Button>
    </Flex>
  );
};

export default Footer;
