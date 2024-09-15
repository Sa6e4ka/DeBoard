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

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useSendTransaction, TransactionButton } from "thirdweb/react";

import { ethers } from "ethers";

import upload from "../pinata";
import {
  getContract,
  prepareContractCall,
  createThirdwebClient,
} from "thirdweb";

import Header from "../components/Header";
import Footer from "../components/Footer";
// import { client } from "../client";

const address = "0x25851a58D622C68eF80817230307b0a6DDeB1769"; // Адрес контракта
const client = createThirdwebClient({
  clientId: "41cfc76de149acd5cab2e1d5f7544c2b",
});

const List = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const { mutate: sendTransaction } = useSendTransaction();

  const value = ethers.utils.parseEther("0.01");
  // Инициализация контракта через thirdweb
  const contract = getContract({
    client: client,
    address: address,
    chainId: 11155111, // Sepolia Testnet
  });

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setImage(file);
  };

  const handleSubmit = () => {
    setError(null);
    setSuccess(null);

    if (!name || !message || !image) {
      setError("All fields are required.");
      return null;
    }

    try {
      setIsUploading(true);

      // Загрузка изображения в IPFS
      const imageUrl = upload({
        file: image,
      });

      const currentTimestamp = Math.floor(Date.now() / 1000);
      const newListing = {
        timestamp: currentTimestamp.toString(),
        name,
        message,
        image: imageUrl,
        sender: "0x6e0d678C10Ad67539470496a91A00B71455061fF", // Текущий адрес пользователя
      };

      // Сбрасываем состояние формы
      setImage(null);
      setMessage("");
      setName("");

      setSuccess("Ad is uploaded successfully!");
      return newListing;
    } catch (err) {
      console.error(err);
      setError("Error uploading ad");
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const bg = useColorModeValue("gray.100", "gray.800");
  const textColor = useColorModeValue("gray.700", "white");

  // Dropzone для загрузки изображения
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    maxFiles: 1,
    onDropRejected: () => {
      setError("Only images are allowed and only one image can be uploaded.");
    },
  });

  const _name = "adfs";
  const _message = "adsf";
  const _image = "adsfasfasdf";

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

        <TransactionButton
          onClick={() => {
            console.log(value);
          }}
          transaction={() =>
            prepareContractCall({
              contract,
              method:
                "function placeAdd(string _message, string _name, string _image) payable",
              params: [_message, _name, _image],
              value: value,
            })
          }
          onError={(err) => console.log(err)} 
          onTransactionSent={() => console.log("sent")}
        >
          Submit
        </TransactionButton>

        {/* Сообщение об ошибке */}
        {error && (
          <Text mt={4} color="red.500" fontWeight="bold">
            {error}
          </Text>
        )}

        {/* Сообщение об успешной загрузке */}
        {success && (
          <Text mt={4} color="green.500" fontWeight="bold">
            {success}
          </Text>
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
