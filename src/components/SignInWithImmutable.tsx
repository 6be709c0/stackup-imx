import { useState } from "preact/hooks";
import SvgIMX from "./svg/SvgIMX";

import { account, userInventory, userBalance } from "../store/imxStore";
import { useStore } from "@nanostores/preact";
import { ethers } from "ethers";
import { getBalance, grantMinterRole, playerInventoryToGame } from "./helpers";

const SignInWithImmutable = () => {
  const $account = useStore(account);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div class={`btn-container${isLoading ? " btn-imx-loading" : ""}`}>
      <div
        class={`btn`}
        onClick={async () => {
          setIsLoading(true);
          // #IMX_ISSUE Had to rely on this until the import of imx sdk is fixed
          if (!window.stackupImx.provider) {
            window.stackupImx.provider = new ethers.BrowserProvider(
              window.stackupImx.passportProvider
            );
          }

          const accs = await window.stackupImx.provider.send(
            "eth_requestAccounts",
            []
          );

          window.stackupImx.userInfo =
            await window.stackupImx.passportInstance.getUserInfo();

          if (accs?.length) {
            account.set(accs[0]);
            // window.stackupImx.userInfo.walletAddress = "0x717F5EE4e83b4A1E32126fF686E8574edB08107E";
            window.stackupImx.userInfo.walletAddress = accs[0];
            // window.stackupImx.userInfo.walletAddress =
            //   "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";

            playerInventoryToGame(userInventory);

            const balance = await getBalance()
            console.log("USER B", balance)
            userBalance.set(balance);
            // const balance = await window.stackupImx.provider.send(
            //   "eth_getBalance",
            //   [window.stackupImx.userInfo.walletAddress, "latest"]
            // );

            // const balanceValue = ethers.formatEther(balance);
          }
          setIsLoading(false);
        }}
      >
        <div class="btn-icon">
          <div class="icon-32x32 w-embed">
            <SvgIMX />
          </div>
          <div class="btn-text">Sign in with Immutable</div>
        </div>
      </div>
    </div>
  );
};

export default SignInWithImmutable;
