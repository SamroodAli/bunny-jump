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
    this.add.image(240, 320, "platform").setScale(0.5);
  }
}
export default Game;
