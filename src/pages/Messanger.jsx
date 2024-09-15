import {
  Box,
  Flex,
  Text,
  Input,
  Button,
  VStack,
  HStack,
  Divider,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

// Sample data to simulate chat history
const chatHistory = [
  { id: 1, sender: "asdfsdfasdfasdfasda", message: "Hi, how are you?" },
  { id: 2, sender: "0x456...def", message: "Interested in your listing!" },
];

const Messenger = () => {
  const [activeChat, setActiveChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Load message history when opening a chat
    if (activeChat) {
      // Simulate loading from a server
      setMessages(chatHistory);
    }
  }, [activeChat]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const messageData = {
        sender: "Your wallet address",
        message: newMessage,
      };
      setMessages((prev) => [...prev, messageData]);
      setNewMessage(""); // Clear the input after sending
    }
  };

  return (
    <Flex h="100vh">
      {/* Chat List (Left) */}
      <VStack
        w="30%"
        p={4}
        spacing={4}
        align="start"
        borderRight="1px solid"
        borderColor="gray.300"
        h="100vh"
      >
        <Text fontSize="2xl" fontWeight="bold">
          Chats
        </Text>
        <Divider />
        {/* List of chats */}
        {["0x123...abc", "0x456...def"].map((chat, index) => (
          <Box
            key={index}
            p={3}
            w="100%"
            cursor="pointer"
            bg={activeChat === chat ? "gray.200" : "white"}
            onClick={() => setActiveChat(chat)}
          >
            <Text>{chat}</Text>
          </Box>
        ))}
      </VStack>

      {/* Chat Window (Right) */}
      <Flex direction="column" w="70%" p={4}>
        <Box flex={1} overflowY="scroll" mb={4}>
          {activeChat ? (
            messages.map((msg, index) => (
              <Box key={index} mb={2}>
                <Text fontWeight="bold">{msg.sender}</Text>
                <Text>{msg.message}</Text>
              </Box>
            ))
          ) : (
            <Text>Select a chat to start messaging</Text>
          )}
        </Box>

        {/* Input Box */}
        {activeChat && (
          <HStack>
            <Input
              placeholder="Type a message"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <Button onClick={sendMessage} colorScheme="teal">
              Send
            </Button>
          </HStack>
        )}
      </Flex>
    </Flex>
  );
};

export default Messenger;
