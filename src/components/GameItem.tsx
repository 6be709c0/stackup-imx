import { useStore } from "@nanostores/preact";
import { userInventory } from "./../store/imxStore";
import { useState } from "preact/hooks";
import { claimNFT, buyNFT, claimNFTAfterBuy, getBalance } from "./helpers";
import Game from "./GameLogic/Game";

const setUserInv = (setInventory: any, newInventory: any) => {
  window.stackupImx.inventory = newInventory;
  setInventory(newInventory);
  localStorage.setItem(
    `inventory-${window.stackupImx.userInfo.walletAddress}`,
    JSON.stringify(newInventory)
  );
};

const wait = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });
};

export const GameSpaceshipInventory = ({
  s,
  index,
  inventory,
  setInventory,
  userBalance,
}: any) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (s.isNFT && !s.owned) {
      if (!s.price) {
        setLoading(true);
        // await wait();
        await claimNFT(s.claimName);
        s.owned = true;
      } else {
        setLoading(true);

        const nft = await buyNFT(s.contractFunction, s.price);
        // await wait();
        if (nft) {
          // window.alert(
          //   "Because of an API bug from IMX transaction (INVALID SIGNATURE), the NFT is free until a fixed is done on the API. Claiming..."
          // );
          console.log("NFT", nft.tokenID);
          await claimNFTAfterBuy(s.claimName, nft.tokenID);
          s.owned = true;
        }
      }
    }

    if (s.owned) {
      const newInventory = {
        ...inventory,
        spaceships: inventory.spaceships.map((spaceship: any, i: any) => {
          return {
            ...spaceship,
            selected: i === index ? true : false,
          };
        }),
      };
      console.log("Updating inventory");

      const balance = await getBalance();
      console.log("USER B", balance);
      userBalance.set(balance);

      setUserInv(setInventory, newInventory);
      window.stackupImx.game = new Game();
    }

    setLoading(false);
    console.log("Loading set to false");
  };

  return (
    <div
      onClick={!loading ? handleClick : () => {}}
      class={`game-item flex rounded-lg shadow-lg p-3${
        s.selected ? " selected" : ""
      }${loading ? " loading" : ""}`}
    >
      <div class="flex-shrink-0">
        <img src={s.image} alt={s.name} class="w-14 h-14" />
      </div>
      <div class="ml-4">
        <h3 class="font-semibold text-lg">{s.name}</h3>
        {loading ? (
          <p class="mt-2 loading-txt">Loading...</p>
        ) : (
          <p class="mt-2">Lives: {s.lives}</p>
        )}
        <p>Speed: {s.speed}</p>
        {!s.owned ? (
          <p class="price">Price: {s.reward ? "FREE" : `${s.price} tIMX`}</p>
        ) : (
          ""
        )}
        <p class={s.isNFT ? "is-nft" : "isnt-nft"}>
          {s.isNFT ? `NFT` : "NOT A NFT"}
        </p>
      </div>
    </div>
  );
};
export const GameProjectileInventory = ({
  p,
  index,
  inventory,
  userBalance,
  setInventory,
}: any) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (p.isNFT && !p.owned) {
      if (!p.price) {
        setLoading(true);
        await claimNFT(p.claimName);
        p.owned = true;
      } else {
        setLoading(true);

        const nft = await buyNFT(p.contractFunction, p.price);
        // await wait();
        if (nft) {
          // window.alert(
          //   "Because of an API bug from IMX transaction (INVALID SIGNATURE), the NFT is free until a fixed is done on the API. Claiming..."
          // );
          console.log("NFT", nft.tokenID);
          await claimNFTAfterBuy(p.claimName, nft.tokenID);
          p.owned = true;
        }
      }
    }

    if (p.owned) {
      const newInventory = {
        ...inventory,
        projectiles: inventory.projectiles.map((projectile: any, i: any) => {
          return {
            ...projectile,
            selected: i === index ? true : false,
          };
        }),
      };
      const balance = await getBalance();
      console.log("USER B", balance);
      userBalance.set(balance);

      setUserInv(setInventory, newInventory);
      window.stackupImx.game = new Game();
    }

    setLoading(false);
  };

  return (
    <div
      onClick={!loading ? handleClick : () => {}}
      class={`game-item flex rounded-lg shadow-lg p-3${
        p.selected ? " selected" : ""
      }${loading ? " loading" : ""}`}
    >
      <div class="flex-shrink-0">
        <img src={p.image} alt={p.name} class="w-14 h-14" />
      </div>
      <div class="ml-4">
        <h3 class="font-semibold text-lg">{p.name}</h3>
        {loading ? (
          <p class="mt-2 loading-txt">Loading...</p>
        ) : (
          <p class="mt-2">Lives: {p.lives}</p>
        )}
        <p>Projectile: {p.number}</p>
        <p>Speed: {p.speed}</p>
        {!p.owned ? <p class="price">Price: {p.price} tIMX</p> : ""}
        <p class={p.isNFT ? "is-nft" : "isnt-nft"}>
          {p.isNFT ? "NFT" : "NOT A NFT"}
        </p>
      </div>
    </div>
  );
};
