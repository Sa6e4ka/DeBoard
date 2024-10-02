import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";

import {
  useSendTransaction,
  useActiveAccount,
  useActiveWalletChain,
} from "thirdweb/react";

import { prepareContractCall } from "thirdweb";
import { toWei } from "thirdweb/utils";

import Header from "../components/Header";
import Footer from "../components/Footer";
import InitialContract from "../contract";
import upload from "../pinata";

const List = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false); // For button and status control

  const { mutate: sendTransaction } = useSendTransaction();

  const bg = useColorModeValue("gray.100", "gray.800");
  const textColor = useColorModeValue("gray.700", "white");

  const navigate = useNavigate();

  const activeAccount = useActiveAccount();
  const activeChain = useActiveWalletChain();

  useEffect(() => {
    if (!activeAccount || !activeChain) {
      navigate("/error");
    }
  }, [activeAccount, activeChain, navigate]);

  const contractData = InitialContract(activeAccount, activeChain);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setImage(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    maxFiles: 1,
    onDropRejected: () => {
      setError("Only images are allowed and only one image can be uploaded.");
    },
  });

  const handleSubmit = async () => {
    setError(null);

    if (!name || !message || !image) {
      setError("All fields are required.");
      return null;
    }

    try {
      setIsUploading(true);
      const imageUrl = await upload({ file: image });

      const newListing = {
        timestamp: Math.floor(Date.now() / 1000).toString(),
        name,
        message,
        image: imageUrl,
        sender: contractData[1].address,
      };

      setImage(null);
      setMessage("");
      setName("");

      return newListing;
    } catch (err) {
      console.error(err);
      setError("Error uploading ad: " + err.message);
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const procceedTransaction = async () => {
    const list = await handleSubmit();
    if (!list) return; // Prevent proceeding if handleSubmit fails

    setIsProcessing(true); // Show "Check wallet" message

    const transactionData = prepareContractCall({
      contract: contractData[0],
      method:
        "function placeAdd(string _message, string _name, string _image) payable",
      params: [list.message, list.name, list.image],
      value: toWei("0.01"),
    });

    sendTransaction(transactionData, {
      onError: (err) => {
        console.error(err);
        setError("Transaction was rejected or failed. Please try again.");
        setIsProcessing(false); // Reset button and status
      },
      onSuccess: () => {
        setError(null);
        setIsProcessing(false); // Reset button and status
      },
    });
  };

  return (
    <Flex
      direction="column"
      align="center"
      p={5}
      w="100%"
      maxW="600px"
      mx="auto"
    >
      <Box
        p={6}
        bg={bg}
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="lg"
        w="100%"
        margin="100px"
      >
        <FormControl mb={4}>
          <FormLabel fontWeight="bold" color={textColor}>
            Ad title
          </FormLabel>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter title"
            bg="white"
          />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel fontWeight="bold" color={textColor}>
            Ad description
          </FormLabel>
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter description"
            bg="white"
            size="md"
          />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel fontWeight="bold" color={textColor}>
            Attach photo
          </FormLabel>
          <Box
            {...getRootProps()}
            borderWidth="2px"
            borderRadius="lg"
            p={6}
            textAlign="center"
            cursor="pointer"
            bg="white"
            borderStyle="dashed"
            borderColor="gray.300"
          >
            <input {...getInputProps()} />
            <Text color="gray.500">
              {image ? "Photo selected" : "Select a photo"}
            </Text>
          </Box>
          {image && (
            <Box mt={4}>
              <Text>{image.name}</Text>
            </Box>
          )}
        </FormControl>

        <Flex justify="center" mt={4}>
          <Button
            colorScheme={isProcessing ? "gray" : "teal"}
            isDisabled={isProcessing}
            onClick={procceedTransaction}
          >
            {isProcessing ? "Processing..." : "Submit (0.01 ETH)"}
          </Button>
        </Flex>

        {isProcessing && (
          <Flex justify={"center"}>
            <Text mt={4} color="blue.500" fontWeight="bold">
              Check your wallet to confirm the transaction
            </Text>
          </Flex>
        )}

        {error && (
          <Flex justify={"center"}>
            <Text mt={4} color="red.500" fontWeight="bold">
              {error}
            </Text>
          </Flex>
        )}
      </Box>
    </Flex>
  );
};

const CreateAdd = () => {
  return (
    <>
      <Header route={"/"} content={"Main page"} />
      <List />
      <Footer />
    </>
  );
};

export default CreateAdd;
