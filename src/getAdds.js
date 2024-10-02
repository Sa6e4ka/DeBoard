import { readContract } from "thirdweb";

const getAdds = async (contract, start, count) => {
  const data = await readContract({
    contract,
    method:
      "function getAdds(uint256 start, uint256 count) view returns ((string title, string description, string image, address sender, uint256 price)[])",
    params: [start, count],
  });

  return data;
};

export default getAdds;
