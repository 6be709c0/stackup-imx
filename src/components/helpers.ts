import { useStore } from "@nanostores/preact";
import { ethers } from "ethers";
import { userBalance } from "../store/imxStore";

const CONTRACT_ABI = [
    "function grantRole(bytes32 role, address account)",
    "function MINTER_ROLE() view returns (bytes32)",
    "function mint(address to, uint256 tokenId)",
    "function ownerOf(uint256 tokenId) view returns (address)",
    "function hasRole(bytes32 role, address account) view returns (bool)",
    "function totalSupply() view returns (uint256)",
    "function mintSpaceshipTwo(uint256 tokenId) external payable",
    "function buySpeedy(uint256 tokenId) external payable",
    "function buyTank(uint256 tokenId) external payable",
    "function buyGME(uint256 tokenId) external payable",
    "function buyLaserThree(uint256 tokenId) external payable",
    "function buyDRS(uint256 tokenId) external payable",
    "function buyDRSFive(uint256 tokenId) external payable",
];

export const getRandomElement = (array: any) => {
    return array[Math.floor(Math.random() * array.length)];
}

async function getNextTokenId(contract: ethers.Contract) {
    try {
        const totalSupply = await contract.totalSupply();
        return parseInt(totalSupply) + 1
    } catch (error) {
        console.error("Error getting next token ID:", error);
        return null;
    }
}


export const playerInventoryToGame = async (inventory: any) => {
    const response: any =
        await window.stackupImx.client.listNFTsByAccountAddress({
            chainName: "imtbl-zkevm-testnet",
            accountAddress: window.stackupImx.userInfo.walletAddress,
            contractAddress:
                window.stackupImx.config.collectionContractAddress,
        });

    const localStorageInventory = localStorage.getItem(`inventory-${window.stackupImx.userInfo.walletAddress}`)
    const uInv = localStorageInventory ? JSON.parse(localStorageInventory) : { ...window.stackupImx.inventory };

    uInv.spaceships = uInv.spaceships.map((e: any) => {
        e.owned = !e.isNFT ? true : false
        return e
    })

    uInv.projectiles = uInv.projectiles.map((e: any) => {
        e.owned = !e.isNFT ? true : false
        return e
    })

    for (let nft of response?.result) {

        console.log("NFT", nft)
        const spaceship = uInv.spaceships.find((e: any) => e.name.toLowerCase() === nft.name?.toLowerCase())
        const projectile = uInv.projectiles.find((e: any) => e.name.toLowerCase() === nft.name?.toLowerCase())

        const item = spaceship || projectile

        if (item) {
            item.owned = true;
        }
    }

    window.stackupImx.inventory = uInv;
    inventory.set(uInv);
}

export const claimNFT = async function (name: string): Promise<any> {
    if (window?.stackupImx?.userInfo?.walletAddress) {
        const userAddress = window.stackupImx.userInfo.walletAddress
        try {
            const response = await fetch(window.stackupImx.config.lambdaURL, {
                method: 'POST',
                body: JSON.stringify({ "address": userAddress, nftName: `${name}`, task: "claimNFT", isLocal: window.stackupImx.config.env == "local" }),
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const res = await response.json()
            console.log("RES", res)
        } catch (error) {
            console.error("Error minting the NFT:", error);
        }
    } else {
        console.log("No user wallet address found");
    }
};
export const claimNFTAfterBuy = async function (name: string, tokenID: number): Promise<any> {
    if (window?.stackupImx?.userInfo?.walletAddress) {
        const userAddress = window.stackupImx.userInfo.walletAddress
        try {
            const response = await fetch(window.stackupImx.config.lambdaURL, {
                method: 'POST',
                body: JSON.stringify({ "address": userAddress, nftName: `${name}`, task: "buyNFT", tokenID, isLocal: window.stackupImx.config.env == "local" }),
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const res = await response.json()
            console.log("RES", res)
        } catch (error) {
            console.error("Error minting the NFT:", error);
        }
    } else {
        console.log("No user wallet address found");
    }
};

export const getBalance = async function (): Promise<any> {
    const balance = await window.stackupImx.provider.send(
        "eth_getBalance",
        [window.stackupImx.userInfo.walletAddress, "latest"]
    );
    // console.log("ABC",  ethers.formatEther(balance), window.stackupImx.userInfo.walletAddress)
    return ethers.formatEther(balance) || 0;
}
// export const buyNFTTest = async function (): Promise<any> {

//     const params = {
//         to: "0x5b5d17B6d2E3063cE8478C19011736654d7d0AcB",
//         value: ethers.parseEther('0.003'),
//         data: ethers.hexlify(ethers.toUtf8Bytes("")),
//     };

//     const txnHash = await window.stackupImx.passportProvider.request({
//         method: "eth_sendTransaction",
//         params: [params],
//     });
//     console.log(txnHash);
// }
export const buyNFT = async function (contractFunctionName: string, price: number, retry: number = 0): Promise<any> {

    if (window.stackupImx.provider) {

        const signer = await window.stackupImx.provider.getSigner();
        const userAddress = window.stackupImx.userInfo.walletAddress

        // const userAddress = signer.address
        const contract = new ethers.Contract(
            window.stackupImx.config.collectionContractAddress,
            CONTRACT_ABI,
            signer
        );
        // const tokenId = 1;
        const tokenID = await getNextTokenId(contract);
        console.log("tokenId", tokenID)
        try {
            console.log("contractFunctionName", contractFunctionName)
            const tx = await contract[contractFunctionName](tokenID, {
                gasLimit: 75000, // Manually set gas limit to 75k
                value: ethers.parseEther(`${price}`)
            });
            const b = await getBalance()
            userBalance.set(b);

            // WAITING ON FIX FOR INVALID SIGNATURE

            const receipt = await tx.wait();
            console.log("NFT minted successfully!", receipt);
            return { receipt, tokenID }
        } catch (error) {
            // if (retry < 0) {
            //     console.log("Retrying...")
            // }
            console.error("Error minting the NFT:", error);
            return false
        }
    } else {
        console.log("No provider found.");
    }
};

// Useless now
export const grantMinterRole = async (userAddress: string) => {
    // Request post to example.org with args {"a":"b"}
    try {
        if (!userAddress) {
            throw new Error('No wallet address');
        }
        console.log(`Granting Minter Role for ${userAddress}`)
        const response = await fetch(window.stackupImx.config.lambdaURL, {
            method: 'POST',
            body: JSON.stringify({ "address": userAddress }),
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const res = await response.json()
        console.log("Grant minter role:", res.message)
        if (!res.message) {
            throw new Error('Failed to claim NFT');
        }

    } catch (error: any) {
        // Handle any errors that occur during the request  
        throw new Error(error.message);
    }
}