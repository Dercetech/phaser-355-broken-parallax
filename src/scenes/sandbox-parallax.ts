const IMG_HERO = "hero-static";
const IMG_TILES = "parallax-tiles";

const TILEMAP = "parallax-sandbox";

const WORLD_WIDTH = "world-width";
const WORLD_HEIGHT = "world-height";

const HERO_SPEED_X = 200;

export class SandboxParallax extends Phaser.Scene {
  private _cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private _player: Phaser.GameObjects.Image;

  private _layerFg: Phaser.Tilemaps.TilemapLayer;
  private _layerMid: Phaser.Tilemaps.TilemapLayer;
  private _layerBg: Phaser.Tilemaps.TilemapLayer;

  constructor() {
    super("SandboxParallax");
  }

  preload(): void {
    this.load.image(IMG_HERO, "assets/zx-frog.png");
    this.load.image(IMG_TILES, "assets/zx-squares.png");
    this.load.tilemapTiledJSON(TILEMAP, "assets/maps/sandbox-parallax.tmj");
  }

  //////////////////////////////////////////////
  //////////////////////////////////////////////

  create(): void {
    this.createInput();
    this.createWorld();
    this.spawnPlayer();
    this.configureCamera();

    console.log("camera display widthl: " + this.cameras.main.displayWidth);
  }

  protected createInput() {
    this._cursors = this.input.keyboard.createCursorKeys();
  }

  protected createWorld() {
    const tilemap = this.make.tilemap({ key: TILEMAP, tileWidth: 8, tileHeight: 8 });
    const tileset = tilemap.addTilesetImage("spectrum", IMG_TILES);

    // Regular approach, not consistent across screen formats, broken by zoom
    this._layerFg = tilemap.createLayer("FG", tileset).setDepth(10).setScrollFactor(1, 1);
    this._layerMid = tilemap.createLayer("MID", tileset).setDepth(4).setScrollFactor(0.5, 1);
    this._layerBg = tilemap.createLayer("BG", tileset).setDepth(2).setScrollFactor(0.25, 1);

    this.data.set(WORLD_WIDTH, tilemap.widthInPixels);
    this.data.set(WORLD_HEIGHT, tilemap.heightInPixels);
  }

  protected spawnPlayer() {
    const startAtTileX = 0;
    const startAtTileY = 10;
    this._player = this.add.image(0 + 16 * startAtTileX, 8 + 16 * startAtTileY, IMG_HERO);
  }

  protected configureCamera() {
    this.cameras.main.setBounds(0, 0, this.data.get(WORLD_WIDTH), this.data.get(WORLD_HEIGHT));
    this.cameras.main.startFollow(this._player);
    // this.cameras.main.setZoom(2); // Zoom is NOT the issue
  }

  //////////////////////////////////////////////
  //////////////////////////////////////////////

  update(now: number, delta: number) {
    this.updatePlayerMovement(delta);

    // console.log(
    //   "midpoint: " +
    //     Math.round(this.cameras.main.midPoint.x) +
    //     " scroll: " +
    //     Math.round(this.cameras.main.scrollX) +
    //     " expected: " +
    //     Math.round(this.cameras.main.midPoint.x - this.cameras.main.displayWidth / 2)
    // );

    // Example:
    // - the midpoint looks at x = 100
    // - with a parallax scroll speed of 50%, that layer should move by 50px
    // - scrollX: Phaser uses the distance between the world's 0px and the camera's left bound, called camera.scrollX in order to compute the parallax layer's position.
    // - this seems wrong as wider screen will cause parallax layers to move slower than on narrower screens.
    // - this makes it impossible to synchronize key parallax positions in a device agnostic manner.
  }

  protected updatePlayerMovement(delta: number) {
    if (this._player && this._cursors) {
      const axisX = this._cursors.left.isDown ? -1 : this._cursors.right.isDown ? 1 : 0;
      this._player.x += (axisX * HERO_SPEED_X * delta) / 1000;
    }
  }

  //////////////////////////////////////////////
  //////////////////////////////////////////////
}
