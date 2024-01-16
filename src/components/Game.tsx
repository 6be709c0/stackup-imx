import SvgIMX from "./svg/SvgIMX";
import { account, userInventory } from "../store/imxStore";

// #IMX_ISSUE Doesn't work because of process.env
import SignInWithImmutable from "./SignInWithImmutable";
import { useStore } from "@nanostores/preact";
import GameBoard from "./GameBoard";
import Customize from "./Customize";
import Inventory from "./Inventory";
// import Test from "./Test";
// import Wallet from "./Wallet";
// import Swap from "./Swap";
import { useState } from "preact/hooks";
import Footer from "./Footer";

var process = {};

declare global {
  interface Window {
    immutable: any;
    stackupImx: any;

    // p5.js
    createCanvas: any;
    loadImage: any;
    p5Data: any;
    width: any;
    height: any;
    fill: any;
    rect: any;
    dist: any;
    random: any;
    image: any;
    test: any;
    textWidth: any;
    textFont: any;
    textSize: any;
    text: any;
    push: any;
    pop: any;
    noStroke: any;
    ellipse: any;
    background: any;
    keyCode: any;
    RIGHT_ARROW: any;
    LEFT_ARROW: any;
    DOWN_ARROW: any;
    UP_ARROW: any;
  }
}

const Game = () => {
  const $account = useStore(account);
  setTimeout(() => {
    if (window.stackupImx) {
      userInventory.set(window.stackupImx.inventory);
    }
  }, 0);

  // const t:any = passport;
  return (
    <>
      <div class="min-h-screen flex flex-col justify-top">
        <div
          class={`stackup-header inline-block mx-auto p-8 relative text-center${
            $account ? " has-account" : ""
          }`}
        >
          <h1 class="bol">StackUp Invaders</h1>
          <div class="mt-6">
            {!$account ? (
              <SignInWithImmutable />
            ) : (
              <>
                <div
                  class="btn"
                  onClick={async () => {
                    await window.stackupImx.passportInstance.logout();
                    account.set("");
                  }}
                >
                  <div>Logout</div>
                </div>
                <GameBoard />
              </>
            )}
          </div>
        </div>
        <div
          onClick={() => {
            const target = document.querySelector(".inventory-container");
            target?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
          class={`stackup-arrow-down ${!$account ? "opacity-0" : "opacity-1"}`}
        >
          <i class="fa-solid fa-circle-arrow-down"></i>
        </div>
      </div>
      {$account ? (
        <>
          <div class="min-h-screen inventory-container flex flex-col">
            <Inventory />
            {/*           
          <div
            onClick={() => {
              // buyNFTTest();
              claimNFT("drsx5");
              // setTest(true)
            }}
          >
            CLICK ME
          </div> */}

            {/* <Test />*/}
            {/* <Swap />  */}
            {/* {test ? <Wallet /> : ""} */}
            <Footer />
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default Game;
