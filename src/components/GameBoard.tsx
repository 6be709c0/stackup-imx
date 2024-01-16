import SvgIMX from "./svg/SvgIMX";

import { account } from "../store/imxStore";
var process = {};

import { useStore } from "@nanostores/preact";
import { useRef } from "preact/hooks";

import Game from "./GameLogic/Game";

const GameBoard = () => {
  const $account = useStore(account);

  const sketchHolder: any = useRef(null);

  setTimeout(() => {
    if (!window.stackupImx.canvas && $account) {
      window.stackupImx.canvas = window.createCanvas(
        sketchHolder?.current?.offsetWidth,
        sketchHolder?.current?.offsetHeight
      );
      window.stackupImx.canvas.style("display", "block");
      window.stackupImx.canvas.parent("sketch-holder");
      // sketch.setup();
      window.stackupImx.game = new Game();
    }
  }, 1000);

  return (
    <div>
      <div id="sketch-holder" ref={sketchHolder}></div>
    </div>
  );
};

export default GameBoard;
