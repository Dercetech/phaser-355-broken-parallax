import "phaser";

import * as scenes from "./scenes";

new Phaser.Game({
  backgroundColor: "#CCCCCC",
  scale: {
    mode: Phaser.Scale.NONE,
    // autoCenter: Phaser.Scale.CENTER_BOTH,
    parent: "vga",
    width: 320,
    height: 240,
    zoom: 2,
  },
  scene: scenes.SandboxParallax,
  pixelArt: true,
});
