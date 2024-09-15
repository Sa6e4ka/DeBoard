import { createThirdwebClient, getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";

const clientId = import.meta.env.VITE_THIRDWEB_CLIENT_ID;
const address = import.meta.env.VITE_CONTRACT_ADDRESS;

export const client = createThirdwebClient({
  clientId: "41cfc76de149acd5cab2e1d5f7544c2b",
});
