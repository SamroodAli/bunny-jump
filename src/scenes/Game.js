import Phaser from "phaser";
import BackgroundImage from "../assets/bg_layer1.png";
import GroundGrass from "../assets/ground_grass.png";
import BunnyStand from "../assets/bunny1_stand.png";
class Game extends Phaser.Scene {
  constructor() {
    super("game");
  }
  /** @type {Phaser.Physics.Arcade.Sprite} */
  player;
  /** @type {Phaser.Physics.Arcade.StaticGroup} */
  platforms;

  preload() {
    this.load.image("background", BackgroundImage);
    this.load.image("platform", GroundGrass);
    this.load.image("bunny-stand", BunnyStand);
  }
  create() {
    this.add.image(240, 320, "background");
    this.platforms = this.physics.add.staticGroup();
    for (let i = 0; i < 5; i++) {
      const x = Phaser.Math.Between(80, 400);
      const y = 150 * i;
      const platform = platforms.create(x, y, "platform");
      platform.scale = 0.5;

      const body = platform.body;
      body.updateFromGameObject();
    }

    this.player = this.physics.add
      .sprite(240, 320, "bunny-stand")
      .setScale(0.5);
    this.physics.add.collider(platforms, this.player);
    this.player.body.checkCollision.up = false;
    this.player.body.checkCollision.left = false;
    this.player.body.checkCollision.right = false;
    this.cameras.main.startFollow(this.player);
  }
  update() {
    const touchingDown = this.player.body.touching.down;
    if (touchingDown) {
      this.player.setVelocityY(-300);
    }
  }
}
export default Game;
