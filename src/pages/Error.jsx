import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";

import {
  ConnectButton,
  lightTheme,
  useActiveAccount,
  useActiveWalletChain,
} from "thirdweb/react";

import Header from "../components/Header";
import { client } from "../client";

const DisplayError = () => {
  const navigate = useNavigate();

  const bg = useColorModeValue("gray.100", "gray.800");
  const textColor = useColorModeValue("gray.700", "white");

  const activeAccount = useActiveAccount();
  const activeChain = useActiveWalletChain();

  useEffect(() => {
    if (activeAccount || activeChain) {
      navigate("/");
    }
  }, [activeAccount, activeChain, navigate]);

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      height="100vh"
      bg={bg}
      p={4}
    >
      <Box textAlign="center" mb={6}>
        <Text
          fontSize={{ base: "xl", md: "xl" }}
          fontWeight="bold"
          color={textColor}
        >
          Please connect your wallet to create an advertisement or to get access
          to the messenger
        </Text>
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

const Error = () => {
  return (
    <>
      <Header route={"/"} content={"Main page"} />
      <DisplayError />
    </>
  );
};

export default Error;
