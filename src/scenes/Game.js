import Phaser from "phaser";
import BackgroundImage from "../assets/bg_layer1.png";
import GroundGrass from "../assets/ground_grass.png";
class Game extends Phaser.Scene {
  constructor() {
    super("game");
  }
  preload() {
    this.load.image("background", BackgroundImage);
    this.load.image("platform", GroundGrass);
  }
  create() {
    this.add.image(240, 320, "background");
    const platforms = this.physics.add.staticGroup();
    for (let i = 0; i < 5; i++) {
      const x = Phaser.Math.Between(80, 400);
      const y = 150 * i;
      const platform = platforms.create(x, y, "platform");
      platform.scale = 0.5;

      const body = platform.body;
      body.updateFromGameObject();
    }
    console.log(platforms);
  }
}
export default Game;
