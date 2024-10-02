import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";

import { client } from "./client";

const contract_address = import.meta.env.VITE_CONTRACT_ADDRESS;

const InitialContract = (activeAccount, activeChain) => {
  const contract = activeChain
    ? getContract({
        client,
        chain: defineChain(activeChain?.id),
        address: contract_address,
      })
    : null;

  return [contract, activeAccount];
};

export default InitialContract;
