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
  /** @type {Phaser.Types.Input.Keyboard.CursorKeys} */
  cursors;
  preload() {
    this.load.image("background", BackgroundImage);
    this.load.image("platform", GroundGrass);
    this.load.image("bunny-stand", BunnyStand);
    this.cursors = this.input.keyboard.createCursorKeys();
    console.log(this.cursors);
  }
  create() {
    this.add.image(240, 320, "background").setScrollFactor(1, 0);
    this.platforms = this.physics.add.staticGroup();
    for (let i = 0; i < 5; i++) {
      const x = Phaser.Math.Between(80, 400);
      const y = 150 * i;
      const platform = this.platforms.create(x, y, "platform");
      platform.scale = 0.5;

      const body = platform.body;
      body.updateFromGameObject();
    }

    this.player = this.physics.add
      .sprite(240, 320, "bunny-stand")
      .setScale(0.5);
    this.physics.add.collider(this.platforms, this.player);
    this.player.body.checkCollision.up = false;
    this.player.body.checkCollision.left = false;
    this.player.body.checkCollision.right = false;
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setDeadzone(this.scale.width * 1.5);
  }
  update() {
    this.platforms.children.iterate((child) => {
      const platform = child;
      const scrollY = this.cameras.main.scrollY;
      if (platform.y >= scrollY + 700) {
        platform.y = scrollY - Phaser.Math.Between(50, 90);
        platform.body.updateFromGameObject();
      }
    });

    const touchingDown = this.player.body.touching.down;
    if (touchingDown) {
      this.player.setVelocityY(-300);
    }
    if (this.cursors.left.isDown && !touchingDown) {
      this.player.setVelocityX(-200);
    } else if (this.cursors.right.isDown && !touchingDown) {
      this.player.setVelocityX(200);
    } else {
      this.player.setVelocityX(0);
    }
    this.horizontalWrap(this.player);
  }
  horizontalWrap(sprite) {
    const halfWidth = sprite.displayWidth * 0.5;
    const gameWidth = this.scale.width;
    if (sprite.x < -halfWidth) {
      sprite.x = gameWidth + halfWidth;
    } else if (sprite.x > gameWidth + halfWidth) {
      sprite.x = -halfWidth;
    }
  }
}
export default Game;
