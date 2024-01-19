# STACKUP INVADERS

https://github.com/6be709c0/stackup-imx/assets/9129639/01cfa9d4-078c-42cd-a7e2-9fc300e63562

## Introduction

Stackup invaders is a game developed to participate in a [stackup quest](https://community.campus.dev/).

It's like a space invaders game embellished with web3 using [Immutable](https://docs.immutable.com/) Passport and Immutable ZkEVM.


**PLAY ON A COMPUTER** (not adapted to small devices)  
Access the game [here](https://stackup-imx.dev.sampleweb3.dev/)  

- **Production environment:** https://stackup-imx.sampleweb3.dev/  
- **Dev environment:** https://stackup-imx.dev.sampleweb3.dev/

## Features

### Playable game

- ✅ A space invader game
- ✅ 3 Levels (you start from level 1 each time)

### Customizable game through NFTs

- ✅ Modify your spaceship to change it's power
- ✅ Modify your projectile to have more fun

### Marketplace to buy/sell NFTs related to the game

- ✅ Custom smart contract based on `ImmutableERC721` to allow user to pay for a NFT


- ✅ Want to speed up your gameplay without grinding ? Buy the best NFTs

- ❌ Want to recycle your unused items for profits ? Sell your NFTs (No time to develop yet)
- ❌ You can also send your NFTs to your friends. (No time to develop yet)



## Run locally

Launch your game
```sh
    npm install
    npm run dev
```

Make it live locally
```sh
    ngrok http --domain=your-domain 4321
```

Update your config accordingly within `src/layouts/Layout.astro`.  
[Configure your immutable passport application](https://docs.immutable.com/docs/zkevm/products/passport/) if it's not done already
```json
{
    "clientId": "your-immutable-passport-id",
    "redirectUri": "https://snake-capable-really.ngrok-free.app",
    "logoutRedirectUri": "https://snake-capable-really.ngrok-free.app",
    "logoutRedirectUri": "https://snake-capable-really.ngrok-free.app",
}
```

## Bugs

### Cannot import @imtbl/imx-sdk

I cannot use  `@imtbl/sdk` on client side. I'm getting the error `process is not defined`. I had to import the cdn file with script tag instead. The code to replace when a fix is in place is tagged with `#IMX_ISSUE`

### FIXED - Transaction from Zkevm wallet trigger an INVALID TRANSACTION

It was working then suddenly I'm getting invalid signature from the API. Waiting for a fix, a thread with other devs have been open on their discord.

## Security disclaimer

This project is created for fun and need security improvements before using it for a real projects. (Especially on verifying the block hash while creating dynamic NFTs)

## Credits

- [Stackup](https://community.campus.dev/) - Thanks for providing this quest, it's fun and teach real use cases.

- [Immutable](https://www.immutable.com/) - Game changer concepts. API wasn't stable during development, first project work on day one, 2 days later, doesn't work without modification (Invalid signature), documentation did not follow, SDK update making the front with react KO (can't use checkout in the new version without modifying the SDK to solve the issue). A bit frustrating for a dev to face those issues in < 7 days, lot of time lost to understand the issue comes from a modification on the API/SDK side. Stability of version & SDK will be much appreciated to keep external dev for a long time. As well as more example. Would love the Game & marketplace doc to actually have a working github project to start with :) The SDK is way too big (>70Mo zipped with dependency, can't use it on lambda layer). I'm excited to create real projects on it once it start to be more stable.

- [Alchemy](https://www.alchemy.com/) - Great tutorials to learn smart contracts development on ethereum in depth!

- [FreeCodeCamp Youtube video](https://www.youtube.com/watch?v=gyMwXuJrbJQ) - Full Stack web3 development, best way to start a web3 journey
  
- [MidJourney](https://www.midjourney.com/) - All assets are generated from midjourney (they are then reworked on GIMP, find the gimp files in the [raw folder](./raw/))

- [ChatGPT](https://openai.com/) - Useful on specific use cases

- [AWS](https://aws.amazon.com/) - Hosting (S3 & Cloudfront - automated with terraform and scripts through AWS Organization). Github workflows & project are stored on a private repository. This act as a public interface.
