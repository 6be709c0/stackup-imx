import { useEffect, useState } from "preact/hooks";
import { checkout } from "@imtbl/sdk";

// create Checkout SDK
const checkoutSDK = new checkout.Checkout();

const Test3 = () => {
  // Initialise widgets, create wallet widget and mount
  useEffect(() => {
    (async () => {
      const widgets = await checkoutSDK.widgets({
        config: { theme: checkout.WidgetTheme.DARK },
      });
      const wallet = widgets.create(checkout.WidgetType.WALLET)
      wallet.mount("wallet");
    })();
  }, []);

  return (<div id="wallet" />);
}

export default Test3;
