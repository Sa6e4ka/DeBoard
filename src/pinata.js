const JWT = import.meta.env.VITE_PINATA_JWT;

const upload = async ({ file }) => {
  try {
    const url = "https://api.pinata.cloud/pinning/pinFileToIPFS";

    let formData = new FormData();
    formData.append("file", file);

    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${JWT}`,
      },
      body: formData,
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(
        `Failed to upload image to IPFS. Status: ${response.status}`
      );
    }

    const data = await response.json();

    // Construct the image URL using your Pinata gateway
    const imageUrl = `https://fuchsia-improved-wildcat-98.mypinata.cloud/ipfs/${data.IpfsHash}`;

    return imageUrl;
  } catch (error) {
    console.error("Error uploading file to IPFS: ", error);
    throw new Error("Failed to upload image to IPFS");
  }
};

export default upload;
