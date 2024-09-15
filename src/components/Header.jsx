import { ConnectButton, lightTheme } from "thirdweb/react";
import { useNavigate } from "react-router-dom";
import { client } from "../client";

import { Flex, Box, Button, useColorModeValue } from "@chakra-ui/react";

const Header = ({ route, content }) => {
  const bg = useColorModeValue("gray.100", "gray.800");
  const navigate = useNavigate();

  return (
    <Flex
      as="header"
      p={{ base: "10px", md: "20px" }}
      bg={bg}
      justify="space-between"
      align="center"
      boxShadow="md"
      w="100%"
      maxWidth="1200px"
      mx="auto"
      position="fixed" // Закрепляем хедер
      top="0" // Прикрепляем к верхней части страницы
      left="0"
      right="0"
      zIndex="1000" // Обеспечиваем, чтобы хедер был на переднем плане
    >
      <Box>
        <Button
          colorScheme="teal"
          size={{ base: "lg", md: "md" }}
          onClick={() => navigate(route)}
        >
          {content}
        </Button>
      </Box>
      <Box>
        <ConnectButton
          client={client}
          connectButton={{
            label: "Connect wallet",
            size: "compact",
          }}
          theme={lightTheme()}
        />
      </Box>
    </Flex>
  );
};

export default Header;
